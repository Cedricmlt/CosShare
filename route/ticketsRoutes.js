import express from 'express';
import checkToken from '../middlewares/checkToken.js';
import ticketsController from '../controller/ticketsController.js';

const router = express.Router();

router.get('/', checkToken, ticketsController.getAllTickets);
router.post('/', checkToken, ticketsController.createTicket);
router.put('/:id_ticket/statut', checkToken, ticketsController.updateStatut);
router.delete('/:id_ticket', checkToken, ticketsController.deleteTicket);

export default router;