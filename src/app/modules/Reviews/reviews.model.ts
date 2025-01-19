import { Schema, model } from "mongoose";
import { TReviews } from "./reviews.interface";

// Define the schema based on the TBooking interface
const reviewsSchema = new Schema<TReviews>({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Services", required: true },
  ratings: {
    type: Number,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
});

// Create the Reviews model
export const ReviewsModel = model<TReviews>("Reviews", reviewsSchema);
