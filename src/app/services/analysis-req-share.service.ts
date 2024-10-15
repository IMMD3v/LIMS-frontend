import { Injectable } from '@angular/core';
import { AnalysisRequestDTO } from '../models/analysis-req-dto';

@Injectable({
  providedIn: 'root'
})
export class AnalysisReqShareService {

  constructor() { }

  setAnalysis(item: AnalysisRequestDTO): void {

    const analysisData = {
      id: item.id,
      status: item.status,
      requestDate: item.requestDate,
      requestedBy: item.requestedBy,
      completionDate: item.completionDate,
      liquidId: item.liquidId,
      containerId: item.containerId,
      powerHydrogen: item.powerHydrogen,
      turbidity: item.turbidity
    }

    sessionStorage.setItem('selectedAnalysisReq', JSON.stringify(analysisData))
  }

  getAnalysis(): AnalysisRequestDTO | null {
    const storedAnalysis = sessionStorage.getItem('selectedAnalysisReq');
    if (storedAnalysis) {
      const analysis: AnalysisRequestDTO = JSON.parse(storedAnalysis);
      return analysis;
    } else {
      return null;
    }
  }

  removeAnalysis(): void {
    sessionStorage.removeItem('selectedAnalysisReq');
  }
}
