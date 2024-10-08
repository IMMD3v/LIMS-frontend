import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ContainerDTO } from '../../models/container-dto';
import { ContainerService } from '../../services/container.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-list',
  standalone: true,
  imports: [],
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.css'
})
export class ContainerListComponent {

  containers: ContainerDTO[] = [];
  totalRecords: number | undefined;

  constructor(private containerService: ContainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContainers();
  }

  getAllContainers(): void {
    this.containerService.listAll().subscribe({
      next: (data: ContainerDTO[]) => {
        this.containers = data;
        this.totalRecords = this.containers.length;
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  onCreateNewContainer(): void {
    this.router.navigate(['/newContainer/']);
  }

  onDetails(id: number | undefined): void {
    console.log(id);
    this.router.navigate([`contDetails/${id}`]);
  }

  onUpdating(id: number | undefined): void {
    this.router.navigate([`editContainer/${id}`]);
  }

  deleteRecord(id: number | undefined): void {
    console.log(id);
    if (id != undefined) {
      let aviso = confirm('Seguro borraras este registro?');
      if (aviso == true) {
        this.containerService.delete(id).subscribe({
          next: (data: any) => {
            console.log(data);
            alert('Se borró el registro!');
            this.router.navigate(['']);
          },
          error: (error: HttpErrorResponse) => {
            alert('Error al intentar borrar el registro!');
            console.log(error);
          },
        });
      } else {
        alert('Operación cancelada: El registro no se borró!');
      }
    }
  }


}
