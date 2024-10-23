import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatToolbarModule }  from '@angular/material/toolbar';
import { ComponentComunicationService } from './services/component-comunication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, NavbarComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anguLims';
  showFiller = false;
  isSidenavOpened: boolean = true;

  @ViewChild('drawer') drawer!: MatDrawer; // Accedemos al drawer usando ViewChild

  constructor(private ccs: ComponentComunicationService) {}

  ngOnInit() {
    // Nos suscribimos al toggle para abrir/cerrar el sidebar desde el navbar
    this.ccs.toggleSidebar$.subscribe(() => {
      this.drawer.open(); // Abrimos el drawer
    });
  }


  // Cerrar el sidebar y mostrar el botón del navbar
  toggleSidebar() {
    this.drawer.toggle();
    const isOpen = this.drawer.opened;
    this.ccs.setNavbarButtonVisibility(!isOpen);
  }

  
}
