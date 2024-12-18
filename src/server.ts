import express, { Request, Response } from "express";
import cors from "cors";
import ReservationRepositoryImpl from "./infrastructure/database/ReservationRepositoryImpl";
import CheckSiteAvailability from "./domain/reservation/application/use-cases/check-site-availability";
import CreateReservation from "./domain/reservation/application/use-cases/create-reservation";
import DeleteReservation from "./domain/reservation/application/use-cases/delete-reservation";
import ListAllReservationsPerSite from "./domain/reservation/application/use-cases/list-all-reservations-per-site";
import ListAllReservationsPerUser from "./domain/reservation/application/use-cases/list-all-reservations-per-user";
import ReservationController from "./presentation/controllers/ReservationController";
import ConfirmReservation from "./domain/reservation/application/use-cases/confirm-reservation";

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const reservationRepository = new ReservationRepositoryImpl();
const checkSiteAvailabilityUseCase = new CheckSiteAvailability(reservationRepository);
const createReservationUseCase = new CreateReservation(reservationRepository);
const deleteReservationUseCase = new DeleteReservation(reservationRepository);
const listAllReservationsPerSiteUseCase = new ListAllReservationsPerSite(reservationRepository);
const listAllReservationsPerUserUseCase = new ListAllReservationsPerUser(reservationRepository);
const confirmReservationUseCase = new ConfirmReservation(reservationRepository);

const reservationController = new ReservationController(
    checkSiteAvailabilityUseCase,
    createReservationUseCase,
    deleteReservationUseCase,
    listAllReservationsPerSiteUseCase,
    listAllReservationsPerUserUseCase,
    confirmReservationUseCase
);

// Rotas
app.post('/check-availability', (req: Request, res: Response) => reservationController.checkAvailability(req, res));
app.post('/reservations', (req: Request, res: Response) => reservationController.register(req, res));
app.delete('/reservations/:id', (req: Request, res: Response) => reservationController.delete(req, res));
app.get('/reservations/site/:siteId', (req: Request, res: Response) => reservationController.listAllReservationsPerSite(req, res));
app.get('/reservations/user/:userId', (req: Request, res: Response) => reservationController.listAllReservationsPerUser(req, res));
app.put('/reservations/:id/confirm', (req: Request, res: Response) => reservationController.confirmReservation(req, res));

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log("Server is running on http://localhost:3000");
});
