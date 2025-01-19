import { Types } from "mongoose";

export type TReviews = {
  customer: Types.ObjectId;
  serviceId: Types.ObjectId;
  ratings: number;
  reviewText: string;
};
