import { Injectable } from '@angular/core';
import { LiquidDTO } from '../models/liquid-dto';

@Injectable({
  providedIn: 'root'
})
export class LiquidShareService {

  constructor() { }

  setLiquid(item: LiquidDTO): void {

    const liquidData = {
      id: item.id,
      description: item.description,
      origin: item.origin,
      originalVolume: item.originalVolume,
      actualVolume: item.actualVolume,
      batch: item.batch
    }

    sessionStorage.setItem('selectedLiquid', JSON.stringify(liquidData))
  }

  getLiquid(): LiquidDTO | null {
    const storedLiquid = sessionStorage.getItem('selectedLiquid');
    if (storedLiquid) {
      const liquid: LiquidDTO = JSON.parse(storedLiquid);
      return liquid;
    } else {
      return null;
    }
  }

  removeLiquid(): void {
    sessionStorage.removeItem('selectedLiquid');
  }
}
