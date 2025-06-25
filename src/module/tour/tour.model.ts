import { model, Schema } from 'mongoose';
import { ITour, ITourMethods, ITourModel } from './tour.interface';

const tourSchema = new Schema<ITour, ITourModel, ITourMethods>(
  {
    name: { type: String, required: true },
    durationHours: { type: Number, required: true },
    averageRating: { type: Number, default: 5 },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    coverImage: { type: String, required: true },
    images: { type: [String], default: [] },
    startDates: { type: [Date], required: true },
    startLocation: { type: String, required: true },
    locations: { type: [String], required: true },
    slug: String,
  },
  { timestamps: true },
);

// instance ===
tourSchema.methods.getNextNearestStartAndEndDate = function () {
  const today = new Date();

  const futureDates = this.startDates.filter((startDate: Date) => {
    return startDate > today;
  });
  futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

  const nearestStartDate = futureDates[0];
  const estimatedEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
  );

  return {
    nearestStartDate,
    estimatedEndDate,
  };
};

// tour model =====
export const Tour = model<ITour, ITourModel>('Tour', tourSchema);

// tourSchema.static("getNextNearestStartAndEndDate", function getNextNearestStartAndEndDate() {
//   const today = new Date()

//   const futureDates = this.startDates.filter((startDate : Date) => {
//     return startDate>today
//   })
// futureDates.sort((a:Date,b:Date)=> a.getTime()-b.getTime())

// const nearestStartDate = futureDates[0]
// const estimatedEndDate = new Date(nearestStartDate.getTime() + (this.durationHours * 60 * 60 * 1000))

// return {
//   nearestStartDate,
//   estimatedEndDate
// }
// })
