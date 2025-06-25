import { HydratedDocument, Model } from "mongoose"

export interface ITour{
    name: string
    durationHours:number
    averageRating:number
    price:number
    availableSeats:number
    coverImage:string
    images:string[]
    startDates:Date[]
    startLocation:string
    locations:string[]
    slug:string
}

export interface ITourMethods {
    getNextNearestStartAndEndDate() : {
        nearestStartDate:Date|null
        estimatedEndDate:Date|null
    }
}

export type ITourModel = Model<ITour, Record<string, unknown>, ITourMethods>

// export interface ITourModel extends Model<ITour, Record<string,unknown>, ITourMethods > {
//     startDates:Date[],
//     durationHours:number,
//     getNextNearestStartAndEndDate():Promise<HydratedDocument<ITour, ITourMethods>>
//   }