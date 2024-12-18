import Reservation from '../../enterprise/entities/Reservation';
import ReservationRepository from '../../enterprise/repositories/ReservationRepository';

interface DeleteReservationData {
    id: string;
    userId: string;
}

export default class DeleteReservation {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(data: DeleteReservationData): Promise<Reservation | undefined> {
        const reservation = await this.reservationRepository.findById(data.id);
        if (!reservation) {
            throw new Error('Reserva não encontrada.');
        }

        if (reservation.getUserId() !== data.userId) {
            throw new Error('Você não tem permissão para cancelar esta reserva.');
        }

        if (reservation.getStatus() === 'confirmada') {
            throw new Error('A reserva não pode ser cancelada, Pois ja foi confirmada.');
        }

        return await this.reservationRepository.deleteReservation(data.id);
    }
}
