import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentComunicationService {

// BehaviorSubject que mantiene el estado del botón del navbar
private isNavbarButtonVisible = new BehaviorSubject<boolean>(true);

// Observable al que pueden suscribirse los componentes
navbarButtonVisible$ = this.isNavbarButtonVisible.asObservable();

// Método para cambiar el estado de visibilidad del botón del navbar
setNavbarButtonVisibility(visible: boolean) {
  this.isNavbarButtonVisible.next(visible);
}

private toggleSidebarSource = new Subject<void>();
  toggleSidebar$ = this.toggleSidebarSource.asObservable();


toggleSidebar() {
  this.toggleSidebarSource.next(); // Emitimos la señal para que el sidebar se abra
}

  
}
