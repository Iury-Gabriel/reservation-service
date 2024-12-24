import Reservation, { ReservationWithSiteName } from '../../enterprise/entities/Reservation';
import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface GetReservation {
    reservationId: string;
}

export default class GetReservationById {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: GetReservation): Promise<ReservationWithSiteName | undefined> {
        return await this.reservationRepository.findById(data.reservationId);
    }
    
}
