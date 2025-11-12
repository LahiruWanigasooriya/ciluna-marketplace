"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import OrderModel from "../../models/order";
import { processPayment } from "../utils/payment/payment";
import CartModel from "../../models/cart";
import ProductModel from "../../models/product";
import { generateOrderId } from "@/utils/order";

export async function createOrder(orderData: any) {
	try {
		await dbConnectMarketPlace();

		const { userId, items, totalPrice, discount, finalPrice, payment, shippingAddress } = orderData;

		if (!userId || !items || !payment || !shippingAddress) {
			return { status: 400, success: false, message: "Missing required fields" };
		}

		// check for stock availability
		const stockCheck = await validateStock(items);
		if (!stockCheck.success) {
			return {
				status: 400,
				success: false,
				message: stockCheck.message,
				productId: stockCheck.productId,
			};
		}

		const orderId = generateOrderId();

		// Step 1: Create Order (Initially Pending)
		const newOrder = new OrderModel({
			orderId,
			userId,
			items,
			totalPrice,
			discount,
			finalPrice,
			payment: {
				method: payment.method,
				status: "pending",
			},
			shippingAddress,
			status: "pending",
		});

		const savedOrder = await newOrder.save();

		// Step 2: Process Payment dynamically
		// const paymentResponse = await processPayment(payment.method, finalPrice, payment.paymentMethodId);
		const paymentResponse = { success: true, transactionId: "mock_txn_" + Date.now() }; // use the above line when implementing the payment

		if (paymentResponse.success) {
			// Payment successful, update order
			savedOrder.payment.status = "completed";
			// savedOrder.payment.transactionId = paymentResponse.transactionId;
			savedOrder.status = "processing";
			await savedOrder.save();

			// Step 3: Clear Cart
			await CartModel.findOneAndUpdate({ userId }, { items: [], totalPrice: 0, discount: 0, finalPrice: 0 });

			return {
				status: 201,
				success: true,
				message: "Order placed successfully",
				data: JSON.parse(JSON.stringify(savedOrder.toObject())),
			};
		} else {
			savedOrder.payment.status = "failed";
			await savedOrder.save();

			return { status: 400, success: false, message: "Payment failed", data: savedOrder };
		}
	} catch (error: any) {
		return { status: 500, success: false, message: error.message };
	}
}

// check stock avialability
async function validateStock(items: any[]) {
	for (const item of items) {
		const product = await ProductModel.findById(item.productId);

		if (!product) {
			return {
				success: false,
				message: `Product with ID ${item.productId} not found.`,
				productId: item.productId,
			};
		}

		if (item.quantity > product.stock) {
			return {
				success: false,
				message: `Only ${product.stock} items left for ${product.name}.`,
				productId: item.productId,
			};
		}
	}

	return { success: true };
}
