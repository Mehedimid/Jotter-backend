import { Router } from 'express';
import { tourController } from './tour.controller';

const tourRouter = Router();

tourRouter.get('/:tourId', tourController.getSingleTour);

tourRouter.get('/schedule/:tourId', tourController.getNextSchedule);

tourRouter.get('/', tourController.getTours);

tourRouter.post('/create-tour', tourController.createTour);

tourRouter.put('/:tourId', tourController.updateTour);

tourRouter.delete('/:tourId', tourController.deleteTour); 

export default tourRouter;
