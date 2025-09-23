"use server";

import {
  AddToCartParams,
  UpdateCartItemParams,
  RemoveCartItemParams,
} from "@/types/cart";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import CartModel from "@/models/cart";
import ProductModel from "@/models/product";
import ProductVariantModel from "@/models/productVariant";
import { verifyToken } from "../utils/auth";
import { cookies } from "next/headers";
// Ensure all models are imported and registered
import "@/models/category";
import "@/models/brand";
import "@/models/product";
import "@/models/subcategory";
import "@/models/productVariant";
import "@/models/productVariantCategory";
import "@/models/productVariantSubCategory";

// Add to cart
export async function addToCart(params: AddToCartParams, token?: string) {
  try {
    await dbConnectMarketPlace();

    // Get token from cookies if not provided
    const authToken = token || (await cookies()).get("authToken")?.value;

    if (!authToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized: No token provided",
        user: null,
      };
    }

    // Verify token and get userId
    const tokenResponse = await verifyToken(authToken);
    if (tokenResponse.status !== 200) {
      return { success: false, message: tokenResponse.message };
    }

    const userId = tokenResponse.userId;

    // Validate product exists
    const product = await ProductModel.findById(params.productId);
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Handle variant validation
    let finalPrice = product.price; // Default to product price
    let discount = product.discount?.percentage || 0; // Default to product discount
    let stockToCheck = product.stock; // Default to product stock

    if (params.productVariantId) {
      const variant = await ProductVariantModel.findById(
        params.productVariantId
      ).populate({
        path: "subCategoryIds",
        select: "value",
      });

      if (!variant) {
        return { success: false, message: "Product variant not found" };
      }

      // Validate variant belongs to product
      if (variant.productId.toString() !== params.productId) {
        return { success: false, message: "Invalid product variant" };
      }

      finalPrice = variant.price; // Use variant price
      discount = variant.discount?.percentage || 0; // Use variant discount
      stockToCheck = variant.stock; // Use variant stock
    }

    // Find existing cart or create new one
    let cart = await CartModel.findOne({ userId, isDeleted: false });

    // Calculate total quantity of the item in the cart
    let totalQuantityInCart = params.quantity;
    if (cart) {
      const existingItem = cart.items.find((item: any) =>
        params.productVariantId
          ? item.productId.toString() === params.productId &&
            item.productVariantId?.toString() === params.productVariantId
          : item.productId.toString() === params.productId &&
            !item.productVariantId
      );

      if (existingItem) {
        totalQuantityInCart += existingItem.quantity;
      }
    }

    // Check if the total quantity exceeds the available stock
    if (totalQuantityInCart > stockToCheck) {
      return {
        success: false,
        message: `Only ${stockToCheck} items available in stock. You already have ${
          totalQuantityInCart - params.quantity
        } in your cart.`,
      };
    }

    // Calculate item totals
    const itemTotal = finalPrice * params.quantity;
    const discountAmount = (itemTotal * discount) / 100;
    const finalTotal = itemTotal - discountAmount;

    const { color, size } = params;

    if (!cart) {
      // Create new cart
      cart = new CartModel({
        userId,
        items: [
          {
            productId: params.productId,
            productVariantId: params.productVariantId || null,
            quantity: params.quantity,
            price: finalPrice,
            discount,
            discountAmount,
            total: itemTotal,
            finalTotal: finalTotal,
          },
        ],
        totalPrice: itemTotal,
        discount: discountAmount,
        finalPrice: finalTotal,
        color,
        size,
      });
    } else {
      // Find existing item in cart
      const existingItemIndex = cart.items.findIndex((item: any) =>
        params.productVariantId
          ? item.productId.toString() === params.productId &&
            item.productVariantId?.toString() === params.productVariantId
          : item.productId.toString() === params.productId &&
            !item.productVariantId
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity and totals
        cart.items[existingItemIndex].quantity += params.quantity;
        cart.items[existingItemIndex].total =
          cart.items[existingItemIndex].quantity * finalPrice;
        cart.items[existingItemIndex].discount =
          (cart.items[existingItemIndex].total * discount) / 100;
        cart.items[existingItemIndex].finalTotal =
          cart.items[existingItemIndex].total -
          cart.items[existingItemIndex].discount;
      } else {
        // Add new item to cart
        cart.items.push({
          productId: params.productId,
          productVariantId: params.productVariantId || null,
          quantity: params.quantity,
          price: finalPrice,
          discount,
          discountAmount,
          total: itemTotal,
          finalTotal: finalTotal,
          color,
          size,
        });
      }

      // Recalculate cart totals
      cart.totalPrice = cart.items.reduce(
        (sum: any, item: any) => sum + item.total,
        0
      );
      cart.discountAmount = cart.items.reduce(
        (sum: any, item: any) => sum + item.discount,
        0
      );
      cart.finalPrice = cart.items.reduce(
        (sum: any, item: any) => sum + item.finalTotal,
        0
      );
    }

    await cart.save();

    // Populate cart with product and variant details
    await cart.populate([
      {
        path: "items.productId",
        select: "name image brand model price discount",
      },
      {
        path: "items.productVariantId",
        select: "price stock",
        populate: {
          path: "subCategoryIds",
          model: "ProductVariantSubCategory",
          select: "value subValue",
        },
      },
    ]);

    return {
      success: true,
      message: "Item added to cart successfully",
      cart: JSON.parse(JSON.stringify(cart.toObject())),
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: "Failed to add item to cart",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Update cart item
export async function updateCartItem(
  params: UpdateCartItemParams,
  token?: string
) {
  try {
    await dbConnectMarketPlace();

    // Get token from cookies if not provided
    const authToken = token || (await cookies()).get("authToken")?.value;

    if (!authToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized: No token provided",
        user: null,
      };
    }

    const tokenResponse = await verifyToken(authToken);
    if (tokenResponse.status !== 200) {
      return { success: false, message: tokenResponse.message };
    }

    const cart = await CartModel.findOne({
      userId: tokenResponse.userId,
      isDeleted: false,
    });

    if (!cart) {
      return { success: false, message: "Cart not found" };
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === params.itemId
    );

    if (itemIndex === -1) {
      return { success: false, message: "Cart item not found" };
    }

    const cartItem = cart.items[itemIndex];

    // Update quantity if provided
    if (params.quantity !== undefined) {
      // Check stock availability based on whether item has variant
      const stockToCheck = cartItem.productVariantId
        ? await ProductVariantModel.findById(cartItem.productVariantId)
        : await ProductModel.findById(cartItem.productId);

      if (!stockToCheck || stockToCheck.stock < params.quantity) {
        return { success: false, message: "Insufficient stock" };
      }

      cartItem.quantity = params.quantity;
      cartItem.total = cartItem.price * params.quantity;
      cartItem.discount =
        cartItem.total * (cartItem.discount / cartItem.total) || 0;
      cartItem.finalTotal = cartItem.total - cartItem.discount;
    }

    // Handle variant updates
    if (params.productVariantId) {
      // Check if the item originally had a variant
      if (!cartItem.productVariantId) {
        return {
          success: false,
          message: "Cannot add variant to non-variant product",
        };
      }

      const variant = await ProductVariantModel.findById(
        params.productVariantId
      );
      if (!variant) {
        return { success: false, message: "Product variant not found" };
      }

      // Verify variant belongs to the same product
      if (variant.productId.toString() !== cartItem.productId.toString()) {
        return {
          success: false,
          message: "Invalid variant for this product",
        };
      }

      cartItem.productVariantId = params.productVariantId;
      cartItem.price = variant.price; // Update price from variant
      cartItem.total = variant.price * cartItem.quantity;
      cartItem.discount =
        (cartItem.total * (variant.discount?.percentage || 0)) / 100;
      cartItem.finalTotal = cartItem.total - cartItem.discount;
    }

    // Recalculate cart totals
    cart.totalPrice = cart.items.reduce(
      (sum: any, item: any) => sum + item.total,
      0
    );
    cart.discount = cart.items.reduce(
      (sum: any, item: any) => sum + item.discount,
      0
    );
    cart.finalPrice = cart.items.reduce(
      (sum: any, item: any) => sum + item.finalTotal,
      0
    );

    await cart.save();

    // Populate cart details
    await cart.populate([
      {
        path: "items.productId",
        select: "name image brand model price discount",
      },
      {
        path: "items.productVariantId",
        select: "price stock",
        populate: {
          path: "subCategoryIds",
          model: "ProductVariantSubCategory",
          select: "value subValue",
        },
      },
    ]);

    return {
      success: true,
      message: "Cart item updated successfully",
      cart: JSON.parse(JSON.stringify(cart.toObject())),
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      success: false,
      message: "Failed to update cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Remove item from cart
export async function removeCartItem(
  params: RemoveCartItemParams,
  token?: string
) {
  try {
    await dbConnectMarketPlace();

    console.log("params: ", params);

    // Get token from cookies if not provided
    const authToken = token || (await cookies()).get("authToken")?.value;

    if (!authToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized: No token provided",
        user: null,
      };
    }

    const tokenResponse = await verifyToken(authToken);
    if (tokenResponse.status !== 200) {
      return { success: false, message: tokenResponse.message };
    }

    const cart = await CartModel.findOne({
      userId: tokenResponse.userId,
      isDeleted: false,
    });

    if (!cart) {
      return { success: false, message: "Cart not found" };
    }

    // Find the item to be removed
    const itemToRemove = cart.items.find(
      (item: any) => item._id.toString() === params.itemId
    );

    if (!itemToRemove) {
      return { success: false, message: "Cart item not found" };
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item: any) => item._id.toString() !== params.itemId
    );

    // Recalculate cart totals
    cart.totalPrice = cart.items.reduce(
      (sum: any, item: any) => sum + item.total,
      0
    );
    cart.discount = cart.items.reduce(
      (sum: any, item: any) => sum + item.discount,
      0
    );
    cart.finalPrice = cart.items.reduce(
      (sum: any, item: any) => sum + item.finalTotal,
      0
    );

    // Reset discount if cart is empty
    if (cart.items.length === 0) {
      cart.discount = 0;
      cart.finalPrice = 0;
    }

    await cart.save();

    // Populate cart details
    await cart.populate([
      {
        path: "items.productId",
        select: "name image brand model price discount",
      },
      {
        path: "items.productVariantId",
        select: "price stock",
        populate: {
          path: "subCategoryIds",
          model: "ProductVariantSubCategory",
          select: "value subValue",
        },
      },
    ]);

    return {
      success: true,
      message: "Item removed from cart successfully",
      cart: JSON.parse(JSON.stringify(cart.toObject())),
    };
  } catch (error) {
    console.error("Error removing cart item:", error);
    return {
      success: false,
      message: "Failed to remove cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get cart
export async function getCart(token?: string) {
  try {
    await dbConnectMarketPlace();

    // Get token from cookies if not provided
    const authToken = token || (await cookies()).get("authToken")?.value;

    if (!authToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized: No token provided",
        user: null,
      };
    }

    const tokenResponse = await verifyToken(authToken);
    if (tokenResponse.status !== 200) {
      return { success: false, message: tokenResponse.message };
    }

    const cart = await CartModel.findOne({
      userId: tokenResponse.userId,
      isDeleted: false,
    }).populate([
      {
        path: "items.productId",
        select: "name image brand model price discount",
      },
      {
        path: "items.productVariantId",
        select: "price stock",
        populate: {
          path: "subCategoryIds",
          model: "ProductVariantSubCategory",
          select: "value subValue",
        },
      },
    ]);

    if (!cart) {
      return {
        success: true,
        message: "No active cart found",
        cart: null,
      };
    }

    return {
      success: true,
      message: "Cart retrieved successfully",
      cart: JSON.parse(JSON.stringify(cart.toObject())),
    };
  } catch (error) {
    console.error("Error getting cart:", error);
    return {
      success: false,
      message: "Failed to get cart",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Clear cart
export async function clearCart(token?: string) {
  try {
    await dbConnectMarketPlace();

    // Get token from cookies if not provided
    const authToken = token || (await cookies()).get("authToken")?.value;

    if (!authToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized: No token provided",
        user: null,
      };
    }

    const tokenResponse = await verifyToken(authToken);
    if (tokenResponse.status !== 200) {
      return { success: false, message: tokenResponse.message };
    }

    const cart = await CartModel.findOne({
      userId: tokenResponse.userId,
      isDeleted: false,
    });

    if (!cart) {
      return {
        success: true,
        message: "No active cart found",
        cart: null,
      };
    }

    // Clear cart items and reset totals
    cart.items = [];
    cart.totalPrice = 0;
    cart.discount = 0;
    cart.finalPrice = 0;

    await cart.save();

    return {
      success: true,
      message: "Cart cleared successfully",
      cart: JSON.parse(JSON.stringify(cart.toObject())),
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      message: "Failed to clear cart",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
