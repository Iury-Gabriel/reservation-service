import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface CheckSiteAvailabilityData {
    siteId: string;
    dataReservation: Date;
    dataCheckout: Date;
}

export default class CheckSiteAvailability {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: CheckSiteAvailabilityData): Promise<boolean> {
        const existingReservations = await this.reservationRepository.getReservationsForSiteInDateRange(
            data.siteId,
            data.dataReservation,
            data.dataCheckout
        );

        if (existingReservations.length > 0) {
            
        }

        return existingReservations.length === 0;
    }
}
