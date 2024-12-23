import Reservation, { ReservationWithSiteName } from '../../enterprise/entities/Reservation';
import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface ListAllReservationsPerUserData {
    userId: string;
}

export default class ListAllReservationPerUser {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: ListAllReservationsPerUserData): Promise<ReservationWithSiteName[] | undefined> {
        return await this.reservationRepository.getAllPerUser(data.userId);
    }
    
}