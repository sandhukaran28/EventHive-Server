const { body, validationResult } = require("express-validator");

exports.validateEvent = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
    body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  exports.validateBooking = [
    body("event").isMongoId().withMessage("Invalid event ID"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  