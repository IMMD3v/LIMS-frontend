export interface AnalysisRequestDTO {
    id?: number;
    liquidId: number;
    containerId: number;
    status?: string;
    requestedBy: string;
    requestDate?: string;
    completionDate?: string;
    //analysis protocol
    powerHydrogen?: number;
    turbidity?: number;
}