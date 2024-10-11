export interface ContainerDTO {
    id?: number;
    name: string;
    capacity: number;
    usedCapacity?: number;
    liquidType?: string;
    material: string;
    inUse?: boolean;
}