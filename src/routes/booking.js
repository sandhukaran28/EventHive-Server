const express = require('express');
const { 
  createBooking, 
  getAllBookings, 
  getBookingById, 
  updateBookingStatus, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { validateBooking } = require('../middleware/eventValidationMiddleware');

const router = express.Router();

router.post('/',protect,validateBooking, createBooking);

router.get('/',protect, getAllBookings);

router.get('/:id',protect, getBookingById);

router.put('/:id',protect, updateBookingStatus);

router.delete('/:id',protect, cancelBooking);

module.exports = router;
