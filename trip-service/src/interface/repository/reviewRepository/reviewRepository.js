import mongoose from "mongoose";
import { reviewModal } from "../../database/schema/reviewSchema/reviewSchema.js";
export class ReviewRepository {
  constructor() {}
  async createReviewRatings(data) {
    try {
      return await reviewModal.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getReviewByDriverId(id) {
    try {
      return await reviewModal.find({ driverId: id });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAverageRatingByDriverId(id) {
    try {
      return await reviewModal.aggregate([
        { $match: { driverId: new mongoose.Types.ObjectId(id) } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: { $toDouble: "$rating" } },
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
