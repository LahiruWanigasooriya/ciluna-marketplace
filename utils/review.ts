import { RatingValue } from "@/types/review";


export function calculateAverageRating(ratingCounts: Record<RatingValue, number>, totalReviews: number): number {
    if (totalReviews === 0) return 0;
    
    const sumOfRatings = (
        (1 * ratingCounts[1]) +
        (2 * ratingCounts[2]) +
        (3 * ratingCounts[3]) +
        (4 * ratingCounts[4]) +
        (5 * ratingCounts[5])
    );
    
    return sumOfRatings / totalReviews;
}