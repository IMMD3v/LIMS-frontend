export interface AnalysisRequestDTO {
    id?: number;
    liquid: string;
    status: string;
    requestedBy: string;
    requestDate: string;
    completionDate: string;
    //analysis protocol
    pH: number;
    turbidity: number;
}