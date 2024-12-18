import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface ConfirmReservationData {
    id: string;
    userId: string;
}

export default class ConfirmReservation {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: ConfirmReservationData): Promise<{ message: string } | undefined> {
        const reservation = await this.reservationRepository.findById(data.id);
        
        if (!reservation) {
            throw new Error('Reservation not found.');
        }

        const ownerId = await this.reservationRepository.getOwnerOfSiteByReservationId(data.id);
        
        if (ownerId !== data.userId) {
            throw new Error('You are not the owner of this site.');
        }

        await this.reservationRepository.confirmReservation(data.id);

        return {
            message: 'Reservation confirmed.',
        };
    }
}
