const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

// CRUD endpoints
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", dataCheckMiddleware, ticketController.createTicket);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);
router.patch("/:id/resolve", ticketController.resolveTicket);

module.exports = router;
