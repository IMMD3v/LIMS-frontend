import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LiquidIdDTO } from '../models/liquid-id-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidMovementService {

  liquidMovementURL: string = 'http://localhost:8080/liquidMovements/';

  constructor(private httpClient: HttpClient) { }

  public capture(reference: LiquidIdDTO): Observable<any> {
    return this.httpClient.post<LiquidIdDTO>(this.liquidMovementURL + 'captureLiquid', reference);
  }
}
