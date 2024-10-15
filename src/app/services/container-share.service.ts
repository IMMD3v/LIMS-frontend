import { Injectable } from '@angular/core';
import { ContainerDTO } from '../models/container-dto';

@Injectable({
  providedIn: 'root'
})
export class ContainerShareService {

  constructor() { }

  setContainer(item: ContainerDTO): void {

    const containerData = {
      id: item.id,
      name: item.name,
      capacity: item.capacity,
      material: item.material,
      inUse: item.inUse,
      liquidId: item.liquidId,
      usedCapacity: item.usedCapacity
    }

    sessionStorage.setItem('selectedContainer', JSON.stringify(containerData))
  }

  getContainer(): ContainerDTO | null {
    const storedContainer = sessionStorage.getItem('selectedContainer');
    if (storedContainer) {
      const container: ContainerDTO = JSON.parse(storedContainer);
      return container;
    } else {
      return null;
    }
  }

  removeContainer(): void {
    sessionStorage.removeItem('selectedContainer');
  }
}
