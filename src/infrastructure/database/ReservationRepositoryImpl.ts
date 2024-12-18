import ReservationRepository from '../../domain/reservation/enterprise/repositories/ReservationRepository';
import Reservation from '../../domain/reservation/enterprise/entities/Reservation';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

export default class ReservationRepositoryImpl extends ReservationRepository {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async save(reservation: Reservation): Promise<Reservation | undefined> {
        const newReservationData = await this.prisma.reservation.create({
            data: {
                userId: reservation.getUserId(),
                siteId: reservation.getSiteId(),
                dataReservation: reservation.getDataReservation(),
                dataCheckout: reservation.getDataCheckout(),
                status: reservation.getStatus(),
                total: reservation.getTotal(),
                createdAt: reservation.getCreatedAt(),
                updatedAt: reservation.getUpdatedAt(),
            },
        });

        return new Reservation(
            newReservationData.id,
            newReservationData.userId,
            newReservationData.siteId,
            newReservationData.dataReservation,
            newReservationData.dataCheckout,
            newReservationData.status,
            newReservationData.total,
            newReservationData.createdAt,
            newReservationData.updatedAt
        );
    }

    async findById(id: string): Promise<Reservation | undefined> {
        const reservationData = await this.prisma.reservation.findUnique({
            where: { id },
        });

        if (!reservationData) return undefined;

        return new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        );
    }

    async getOwnerOfSiteByReservationId(id: string): Promise<string | undefined> {
        const reservationData = await this.prisma.reservation.findUnique({
            where: { id },
            select: {
                siteId: true,
            },
        });
    
        if (!reservationData) return undefined;
    
        try {
            const response = await axios.get(`http://localhost:3001/sites/${reservationData.siteId}`);
            return response.data.ownerId;
        } catch (error) {
            console.error('Erro ao buscar o proprietário do site:', error);
            return undefined;
        }
    }

    async confirmReservation(id: string): Promise<Reservation | undefined> {
        const updatedReservationData = await this.prisma.reservation.update({
            where: { id },
            data: {
                status: 'confirmed',
            },
        });
    
        return new Reservation(
            updatedReservationData.id,
            updatedReservationData.userId,
            updatedReservationData.siteId,
            updatedReservationData.dataReservation,
            updatedReservationData.dataCheckout,
            updatedReservationData.status,
            updatedReservationData.total,
            updatedReservationData.createdAt,
            updatedReservationData.updatedAt
        );
    }
    
    

    async findConflictingReservations(siteId: string, dataReservation: Date, dataCheckout: Date): Promise<Reservation[]> {
        const conflictingReservationsData = await this.prisma.reservation.findMany({
            where: {
                siteId,
                dataReservation: {
                    lte: dataCheckout,
                },
                dataCheckout: {
                    gte: dataReservation,
                },
                status: 'confirmed'
            },
        });

        return conflictingReservationsData.map(reservationData => new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        ));
    }

    async getAll(): Promise<Reservation[] | undefined> {
        const reservationsData = await this.prisma.reservation.findMany();
        return reservationsData.map(reservationData => new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        ));
    }

    async getAllPerUser(userId: string): Promise<Reservation[] | undefined> {
        const reservationsData = await this.prisma.reservation.findMany({
            where: { userId },
        });
        return reservationsData.map(reservationData => new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        ));
    }

    async getAllPerSite(siteId: string): Promise<Reservation[] | undefined> {
        const reservationsData = await this.prisma.reservation.findMany({
            where: { siteId },
        });
        return reservationsData.map(reservationData => new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        ));
    }

    async getReservationsForSiteInDateRange(siteId: string, startDate: Date, endDate: Date): Promise<Reservation[]> {
        const reservationsData = await this.prisma.reservation.findMany({
            where: {
                siteId,
                dataReservation: {
                    gte: startDate,
                    lte: endDate,
                },
                status: 'confirmed',
            },
        });
        return reservationsData.map(reservationData => new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        ));
    }

    async deleteReservation(id: string): Promise<Reservation | undefined> {
        const reservationData = await this.prisma.reservation.delete({
            where: { id },
        });

        return new Reservation(
            reservationData.id,
            reservationData.userId,
            reservationData.siteId,
            reservationData.dataReservation,
            reservationData.dataCheckout,
            reservationData.status,
            reservationData.total,
            reservationData.createdAt,
            reservationData.updatedAt
        );
    }
}
