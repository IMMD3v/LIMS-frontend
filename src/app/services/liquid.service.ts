import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LiquidDTO } from '../models/liquid-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidService {

  liquidURL: string = 'http://localhost:8080/liquids/';

  constructor(private httpClient: HttpClient) { }

  public listAll(): Observable<LiquidDTO[]> {
    return this.httpClient.get<LiquidDTO[]>(this.liquidURL + 'listAll');
  }

  public details(id: number): Observable<LiquidDTO> {
    return this.httpClient.get<LiquidDTO>(this.liquidURL + `details/${id}`);
  }

  public create(object: LiquidDTO): Observable<LiquidDTO> {
    return this.httpClient.post<LiquidDTO>(this.liquidURL + 'create', object);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.liquidURL + `delete/${id}`)
  }

  public update(id: number, object: LiquidDTO): Observable<LiquidDTO> {
    return this.httpClient.put<LiquidDTO>(this.liquidURL + `update/${id}`, object);
  }
}
