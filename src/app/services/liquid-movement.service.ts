import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LiquidIdDTO } from '../models/liquid-id-dto';
import { Observable } from 'rxjs';
import { ContainerIdDTO } from '../models/container-id-dto';
import { RemainVolumeDTO } from '../models/remain-volume-dto';

@Injectable({
  providedIn: 'root'
})
export class LiquidMovementService {

  liquidMovementURL: string = 'http://localhost:8080/liquidMovements/';

  constructor(private httpClient: HttpClient) { }

  public capture(reference: LiquidIdDTO): Observable<any> {
    return this.httpClient.post<LiquidIdDTO>(this.liquidMovementURL + 'captureLiquid', reference);
  }

  public setLiquid(reference: ContainerIdDTO): Observable<RemainVolumeDTO> {
    return this.httpClient.post<RemainVolumeDTO>(this.liquidMovementURL + 'setLiquid', reference);
  }
}
