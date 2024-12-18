import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ContainerDTO } from '../../../models/container-dto';
import { ContainerService } from '../../../services/container.service';
import { Router } from '@angular/router';
import { ContainerShareService } from '../../../services/container-share.service';
import { LiquidDTO } from '../../../models/liquid-dto';
import { LiquidService } from '../../../services/liquid.service';

@Component({
  selector: 'app-container-list',
  standalone: true,
  imports: [],
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.css'
})
export class ContainerListComponent {

  containers: ContainerDTO[] = [];
  liquids: LiquidDTO[] = [];
  liquidMap: {[key: string]: string} = {};
  totalRecords: number | undefined;

  constructor(
    private containerService: ContainerService,
    private liquidService: LiquidService,
    private containerShare: ContainerShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContainers();
    this.getlAllLiquids();
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

  getlAllLiquids(): void {
    this.liquidService.listAll().subscribe({
      next: (data: LiquidDTO[]) => {
        this.liquids = data;
        this.liquids.forEach(liquid => {
          this.liquidMap[liquid.id!] = liquid.description;
          console.log(this.liquidMap);
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  getLiquidName(liquidId: string | undefined): string {
    return this.liquidMap[liquidId!] || 'no asignado';
  }

  onCreateNewContainer(): void {
    this.router.navigate(['/newContainer/']);
  }

  onDetails(item: ContainerDTO): void {
    this.containerShare.setContainer(item);
    this.router.navigate(['contDetails']);
  }

  onUpdating(item: ContainerDTO): void {
    this.containerShare.setContainer(item);
    this.router.navigate(['editContainer']);
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
