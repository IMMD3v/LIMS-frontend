import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisRequestDTO } from '../models/analysis-req-dto';

@Injectable({
  providedIn: 'root'
})
export class AnalysisRequestService {

  analysisReqURL: string = 'http://localhost:8080/analysis/';

  constructor(private httpClient: HttpClient) { }

  public listAll(): Observable<AnalysisRequestDTO[]> {
    return this.httpClient.get<AnalysisRequestDTO[]>(this.analysisReqURL + 'listAll');
  }

  public details(id: number): Observable<AnalysisRequestDTO> {
    return this.httpClient.get<AnalysisRequestDTO>(this.analysisReqURL + `details/${id}`);
  }

  public create(object: AnalysisRequestDTO): Observable<AnalysisRequestDTO> {
    return this.httpClient.post<AnalysisRequestDTO>(this.analysisReqURL + 'create', object);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.analysisReqURL + `delete/${id}`)
  }

  public update(id: number, object: AnalysisRequestDTO): Observable<AnalysisRequestDTO> {
    return this.httpClient.put<AnalysisRequestDTO>(this.analysisReqURL + `update/${id}`, object);
  }
}
