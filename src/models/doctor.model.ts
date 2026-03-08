export interface Doctor {
    id: string;
    name: string;
    specialization?: string;
    consultationFee?: string;
    isActive?: boolean;
    registeredAt?: string;
    imageUrl: string;
}