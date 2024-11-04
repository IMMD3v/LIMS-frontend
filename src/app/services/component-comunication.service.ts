import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentComunicationService {

  private toggleSidebarSubject = new Subject<void>();
  toggleSidebar$ = this.toggleSidebarSubject.asObservable();

  toggleSidebar() {
    this.toggleSidebarSubject.next(); // Emitimos el evento para togglear el sidebar
  }

  
}
