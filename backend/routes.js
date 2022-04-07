const { getSeats, updateSeat } = require("./handlers");

const router = require("express").Router();

router.get("/api/seat-availability", getSeats);

router.post("/api/book-seat", updateSeat);

module.exports = router;
