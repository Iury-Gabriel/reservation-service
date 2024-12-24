import { Request, Response } from 'express';
import CheckSiteAvailability from '../../domain/reservation/application/use-cases/check-site-availability';
import CreateReservation from '../../domain/reservation/application/use-cases/create-reservation';
import DeleteReservation from '../../domain/reservation/application/use-cases/delete-reservation';
import ListAllReservationsPerSite from '../../domain/reservation/application/use-cases/list-all-reservations-per-site';
import ListAllReservationsPerUser from '../../domain/reservation/application/use-cases/list-all-reservations-per-user';
import ConfirmReservation from '../../domain/reservation/application/use-cases/confirm-reservation';
import GetReservationById from '../../domain/reservation/application/use-cases/get-reservation';

export default class ReservationController {
    private checkSiteAvailabilityUseCase: CheckSiteAvailability;
    private createReservationUseCase: CreateReservation;
    private deleteReservationUseCase: DeleteReservation;
    private listAllReservationsPerSiteUseCase: ListAllReservationsPerSite;
    private listAllReservationsPerUserUseCase: ListAllReservationsPerUser;
    private confirmReservationUseCase: ConfirmReservation;
    private getReservationByIdUseCase: GetReservationById;

    constructor(
        checkSiteAvailabilityUseCase: CheckSiteAvailability,
        createReservationUseCase: CreateReservation,
        deleteReservationUseCase: DeleteReservation,
        listAllReservationsPerSiteUseCase: ListAllReservationsPerSite,
        listAllReservationsPerUserUseCase: ListAllReservationsPerUser,
        confirmReservationUseCase: ConfirmReservation,
        getReservationByIdUseCase: GetReservationById
    ) {
        this.checkSiteAvailabilityUseCase = checkSiteAvailabilityUseCase;
        this.createReservationUseCase = createReservationUseCase;
        this.deleteReservationUseCase = deleteReservationUseCase;
        this.listAllReservationsPerSiteUseCase = listAllReservationsPerSiteUseCase;
        this.listAllReservationsPerUserUseCase = listAllReservationsPerUserUseCase;
        this.confirmReservationUseCase = confirmReservationUseCase; 
        this.getReservationByIdUseCase = getReservationByIdUseCase;
    }

    async checkAvailability(req: Request, res: Response): Promise<void> {
        try {
            const { siteId, dataReservation, dataCheckout } = req.body;
            const availability = await this.checkSiteAvailabilityUseCase.execute({ siteId, dataReservation, dataCheckout });
            res.status(200).json(availability);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const reservation = await this.createReservationUseCase.execute(req.body);
            res.status(201).json(reservation);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async confirmReservation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const confirmedReservation = await this.confirmReservationUseCase.execute({ id, userId });
            if (!confirmedReservation) {
                res.status(404).json({ error: 'Reservation not found' });
                return;
            }
            res.status(200).json(confirmedReservation);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const deletedReservation = await this.deleteReservationUseCase.execute({ id, userId });
            if (!deletedReservation) {
                res.status(404).json({ error: 'Reservation not found' });
                return;
            }
            res.status(200).json(deletedReservation);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listAllReservationsPerSite(req: Request, res: Response): Promise<void> {
        try {
            const { siteId } = req.params;
            const reservations = await this.listAllReservationsPerSiteUseCase.execute({ siteId });
            res.status(200).json(reservations);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReservationById(req: Request, res: Response): Promise<void> {
        try {
            const { reservationId } = req.params;
            const reservation = await this.getReservationByIdUseCase.execute({reservationId});
            res.status(200).json(reservation);
        } catch (error: any) {
            
        }
    }

    async listAllReservationsPerUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const reservations = await this.listAllReservationsPerUserUseCase.execute({ userId });
            res.status(200).json(reservations);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
