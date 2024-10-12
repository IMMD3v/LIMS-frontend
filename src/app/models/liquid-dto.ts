export interface LiquidDTO {
    id?: number;
    description: string;
    origin: string;
    originalVolume: number;
    actualVolume?: number;
    batch: string;
}