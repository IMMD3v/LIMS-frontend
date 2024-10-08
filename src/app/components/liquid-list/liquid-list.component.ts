import { Component, OnInit } from '@angular/core';
import { LiquidDTO } from '../../models/liquid-dto';
import { LiquidService } from '../../services/liquid.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-liquid-list',
  standalone: true,
  imports: [],
  templateUrl: './liquid-list.component.html',
  styleUrl: './liquid-list.component.css'
})
export class LiquidListComponent implements OnInit{

  liquids: LiquidDTO[] = [];
  totalRecords: number | undefined;

  constructor(private liquidService: LiquidService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllLiquids();
  }

  getAllLiquids(): void {
    this.liquidService.listAll().subscribe({
      next: (data: LiquidDTO[]) => {
        this.liquids = data;
        this.totalRecords = this.liquids.length;
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  onCreateNewLiquid(): void {
    this.router.navigate(['/newLiquid/']);
  }

  onDetails(id: number | undefined): void {
    console.log(id);
    this.router.navigate([`liquidDetails/${id}`]);
  }

  onUpdating(id: number | undefined): void {
    this.router.navigate([`editLiquid/${id}`]);
  }

  deleteRecord(id: number | undefined): void {
    console.log(id);
    if (id != undefined) {
      let aviso = confirm('Seguro borraras este registro?');
      if (aviso == true) {
        this.liquidService.delete(id).subscribe({
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
