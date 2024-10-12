export interface ContainerDTO {
    id?: number;
    name: string;
    capacity: number;
    material: string;
    //for ADMIN complete update
    usedCapacity?: number;
    liquidType?: string;
    inUse?: boolean;
}