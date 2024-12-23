
import Reservation, { ReservationWithSiteName } from "../entities/Reservation";

export default abstract class ReservationRepository {
    abstract save(reservation: Reservation): Promise<Reservation | undefined>;

    abstract findById(id: string): Promise<ReservationWithSiteName | undefined>;

    abstract findConflictingReservations(siteId: string, dataReservation: Date, dataCheckout: Date): Promise<Reservation[]>;

    abstract getOwnerOfSiteByReservationId(id: string): Promise<string | undefined>;

    abstract confirmReservation(id: string): Promise<Reservation | undefined>;

    abstract getAll(): Promise<Reservation[] | undefined>;

    abstract getAllPerUser(userId: string): Promise<ReservationWithSiteName[] | undefined>;

    abstract getAllPerSite(siteId: string): Promise<Reservation[] | undefined>;

    abstract getReservationsForSiteInDateRange(siteId: string, startDate: Date, endDate: Date): Promise<Reservation[]>;

    abstract deleteReservation(id: string): Promise<Reservation | undefined>;
}
