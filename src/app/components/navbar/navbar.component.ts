import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { ComponentComunicationService } from '../../services/component-comunication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  @Output() openSidenav: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('drawer') drawer!: MatSidenav

  isNavbarButtonVisible = true;
  
  constructor(private ccs: ComponentComunicationService) {}

  ngOnInit() {
    // Nos suscribimos al estado del botón para actualizar la visibilidad
    this.ccs.navbarButtonVisible$.subscribe((visible) => {
      this.isNavbarButtonVisible = visible;
    });
  }

  openSidebar() {
    // Cuando se hace click en el botón del navbar, enviamos un mensaje para que el sidebar se abra
    this.ccs.setNavbarButtonVisibility(false); // Ocultamos el botón del navbar
    this.ccs.toggleSidebar(); // Avisamos al app.component que el sidebar debe abrirse
  }

}
