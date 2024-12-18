import Reservation from '../../enterprise/entities/Reservation';
import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface RegisterReservationData {
    id: string;
    userId: string;
    siteId: string;
    dataReservation: Date;
    dataCheckout: Date;
    status: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export default class RegisterReservation {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: RegisterReservationData): Promise<Reservation | undefined> {
        const conflictingReservations = await this.reservationRepository.findConflictingReservations(
            data.siteId,
            data.dataReservation,
            data.dataCheckout
        );
    
        if (conflictingReservations.length > 0) {
            throw new Error('Já existe uma reserva para este período.');
        }
    
        const reservation = new Reservation(
            data.id,
            data.userId,
            data.siteId,
            data.dataReservation,
            data.dataCheckout,
            data.status,
            data.total,
            data.createdAt,
            data.updatedAt,
        );
    
        return await this.reservationRepository.save(reservation);
    }
    
}
