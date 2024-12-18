import Reservation from '../../enterprise/entities/Reservation';
import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface ListAllReservationsPerSiteData {
    siteId: string;
}

export default class ListAllReservationPerUser {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: ListAllReservationsPerSiteData): Promise<Reservation[] | undefined> {
        return await this.reservationRepository.getAllPerSite(data.siteId);
    }
    
}
