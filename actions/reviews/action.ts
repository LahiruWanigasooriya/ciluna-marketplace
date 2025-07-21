"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import ReviewModel from "@/models/review";
import ProductModel from "@/models/product";
import { verifyToken } from "../utils/auth";
import { cookies } from "next/headers";
import ProductVariantModel from "@/models/productVariant";
import "@/models/user";



// Add a new review

export const addReview = async ({
    productId,
    productVariantId,
    rating,
    title,
    content,
    token,
}: {
    productId: string;
    productVariantId?: string;
    rating: number;
    title: string;
    content: string;
    token?: string;
}) => {
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

        // Verify user token
        const tokenResponse = await verifyToken(authToken);
        if (tokenResponse.status !== 200) {
            return { success: false, message: tokenResponse.message };
        }

        const userId = tokenResponse.userId; // Extract userId from token

        // Check if the user has already reviewed this product or variant
        const existingReview = await ReviewModel.findOne({
            product: productId,
            productVariant: productVariantId || null,
            user: userId,
        });

        if (existingReview) {
            return {
                status: 400,
                success: false,
                message: "You have already reviewed this product or variant.",
            };
        }

        // Create the review
        const newReview = new ReviewModel({
            product: productId,
            productVariant: productVariantId || null,
            user: userId,
            rating,
            title,
            content,
            likes: [],
        });

        await newReview.save();

        // Determine if the product has variants or not
        const product = await ProductModel.findById(productId).populate("productVariantCategories");
        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found",
            };
        }

        // If the product has variants, update the variant's rating
        if (product.productVariantCategories && product.productVariantCategories.length > 0) {
            if (productVariantId) {
                const variantReviews = await ReviewModel.find({ productVariant: productVariantId });
                const totalVariantReviews = variantReviews.length;
                const avgVariantRating = totalVariantReviews > 0 ? variantReviews.reduce((sum, r) => sum + r.rating, 0) / totalVariantReviews : 0;
                await ProductVariantModel.findByIdAndUpdate(productVariantId, { rating: avgVariantRating });
            }
        } else {
            // If no variants, update the product's rating
            const productReviews = await ReviewModel.find({ product: productId, productVariant: null });
            const totalProductReviews = productReviews.length;
            const avgProductRating = totalProductReviews > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / totalProductReviews : 0;
            await ProductModel.findByIdAndUpdate(productId, { rating: avgProductRating });
        }

        return {
            status: 200,
            success: true,
            message: "Review added successfully",
        };
    } catch (error: any) {
        return {
            status: 500,
            success: false,
            message: "An error occurred while adding the review",
            error: error.message,
        };
    }
};




// Get reviews for a specific product (as a slider)
export const getProductReviews = async (productId: string, productVariantId?: string) => {
    try {
        await dbConnectMarketPlace();

        // Fetch reviews based on whether a variant is specified
        const filter = productVariantId
            ? { productVariant: productVariantId } // If a variant is specified, filter by that variant
            : { product: productId }; // Otherwise, filter by the main product

        const reviews = await ReviewModel.find(filter)
            .populate({
                path: "user",
                select: "name", // Get only user name
            })
            .lean();

        return {
            status: 200,
            success: true,
            message: "Reviews fetched successfully",
            data: { reviews },
        };
    } catch (error: any) {
        return {
            status: 500,
            success: false,
            message: "An error occurred while fetching reviews",
            error: error.message,
        };
    }
};





// Get product review summary
export const getProductReviewSummary = async (productId: string, productVariantId?: string) => {
    try {
        await dbConnectMarketPlace();

        // Determine the model to use based on whether productVariantId is provided
        const model = productVariantId ? ProductVariantModel : ProductModel;
        
        // Fetch product or variant's rating
        const product = await model.findById(productVariantId || productId)
            .select("rating")
            .lean<{ rating: number }>();

        if (!product) {
            return { success: false, message: "Product or variant not found" };
        }

        // Explicitly define the type of reviews
        type ReviewType = { rating: number };

        // Fetch all reviews for the product or variant
        const reviews: ReviewType[] = await ReviewModel.find({
            product: productId,
            ...(productVariantId && { productVariant: productVariantId }), // If productVariantId is provided, include that in the filter
        })
            .select("rating")
            .lean()
            .then((res) => res.map((review) => ({ rating: review.rating }))); // Ensure proper typing

        const totalReviews = reviews.length;

        // Initialize rating distribution
        const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        // Safely map ratings into the rating count object
        reviews.forEach((review) => {
            const rating = review.rating as keyof typeof ratingCounts;
            if (ratingCounts[rating] !== undefined) {
                ratingCounts[rating] += 1;
            }
        });

        return {
            status: 200,
            success: true,
            message: "Review summary fetched successfully",
            data: {
                avgRating: product.rating, // Use the rating of the product or variant
                totalReviews,
                ratingCounts,
            },
        };
    } catch (error: any) {
        return {
            status: 500,
            success: false,
            message: "An error occurred while fetching review summary",
            error: error.message,
        };
    }
};



