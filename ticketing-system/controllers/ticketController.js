const { readTickets, writeTickets } = require("../model/ticketModel");

// Get all tickets
function getAllTickets(req, res) {
  const tickets = readTickets();
  res.json(tickets);
}

// Get ticket by ID
function getTicketById(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === +req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

// Create a new ticket
function createTicket(req, res) {
  const tickets = readTickets();
  const newTicket = {
    id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
    ...req.body,
    status: "pending" // default
  };
  tickets.push(newTicket);
  writeTickets(tickets);
  res.status(201).json(newTicket);
}

// Update ticket
function updateTicket(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === +req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  const { title, description, priority } = req.body;
  if (title) ticket.title = title;
  if (description) ticket.description = description;
  if (priority) ticket.priority = priority;

  writeTickets(tickets);
  res.json(ticket);
}

// Delete ticket
function deleteTicket(req, res) {
  let tickets = readTickets();
  const ticket = tickets.find(t => t.id === +req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  tickets = tickets.filter(t => t.id !== +req.params.id);
  writeTickets(tickets);
  res.json({ message: "Ticket deleted successfully" });
}

// Resolve ticket
function resolveTicket(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === +req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  writeTickets(tickets);
  res.json(ticket);
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};
