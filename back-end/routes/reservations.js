import express from 'express';
import { handleReservation } from '../controllers/reservationsController.js';
import { validateReservation } from '../..public/validation.js';
const router = express.Router();
router.post('/', handleReservation);

export default router;

