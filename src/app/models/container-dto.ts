export interface ContainerDTO {
    id?: number;
    name: string;
    capacity: number;
    liquidType?: string;
    material: string;
    inUse?: boolean;
}