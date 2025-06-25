import { ITour } from './tour.interface';
import { Tour } from './tour.model';

const createTour = async (payload: ITour): Promise<ITour> => {
  const result = await Tour.create(payload);
  return result;
};

const getTours = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const excludeFields = ['searchTerm', 'page', 'limit', 'sortOrder', 'sortBy', "fields"];
  excludeFields.forEach((key) => delete queryObj[key]); //query obj theke exclude fields gula bad dilam

  const searchTerm = query.searchTerm || ' ';
  const searchFields = ['name', 'startLocation', 'locations'];

  const searchQuery = Tour.find({
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery.find(queryObj);

  const page = Number(query?.page || 1);
  const limit = Number(query?.limit || 10);
  const skip = (page - 1) * limit;
  const paginatedQuery = filterQuery.skip(skip).limit(limit);

  let sortStr;

  if (query?.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }
  const sortQuery = paginatedQuery.sort(sortStr);

  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }

  const result = await sortQuery.select(fields)

  return result;
};

const getSingleTour = async (tourId: string) => {
  const result = await Tour.findById(tourId);
  return result;
};

const updateTour = async (tourId: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(tourId, payload, { new: true });
  return result;
};

const deleteTour = async (tourId: string) => {
  const result = await Tour.findByIdAndDelete(tourId);
  return result;
};

const getNextSchedule = async (id: string) => {
  const tour = await Tour.findById(id);
  const nextSchedule = tour?.getNextNearestStartAndEndDate();

  return {
    tour,
    nextSchedule,
  };
};

export const tourServices = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
