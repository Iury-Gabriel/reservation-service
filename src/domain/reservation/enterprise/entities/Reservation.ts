export default class Reservation {
    private id: string
    private userId: string
    private siteId: string
    private dataReservation: Date
    private dataCheckout: Date
    private status: string
    private total: number
    private createdAt: Date
    private updatedAt: Date

    constructor(id: string, userId: string, siteId: string, dataReservation: Date, dataCheckout: Date, status: string, total: number, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.userId = userId
        this.siteId = siteId
        this.dataReservation = dataReservation
        this.dataCheckout = dataReservation
        this.status = status
        this.total = total
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public getId(): string {
        return this.id
    }

    public getUserId(): string {
        return this.userId
    }

    public getSiteId(): string {
        return this.siteId
    }

    public getDataReservation(): Date {
        return this.dataReservation
    }    

    public getDataCheckout(): Date {
        return this.dataCheckout
    }

    public getStatus(): string {
        return this.status
    }

    public getTotal(): number {
        return this.total
    }

    public getCreatedAt(): Date {
        return this.createdAt
    }

    public getUpdatedAt(): Date {
        return this.updatedAt
    }
}