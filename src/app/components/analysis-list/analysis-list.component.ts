import { Component } from '@angular/core';
import { AnalysisRequestDTO } from '../../models/analysis-req-dto';
import { AnalysisRequestService } from '../../services/analysis-request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analysis-list',
  standalone: true,
  imports: [],
  templateUrl: './analysis-list.component.html',
  styleUrl: './analysis-list.component.css'
})
export class AnalysisListComponent {

  analysis: AnalysisRequestDTO[] = [];
  totalRecords: number | undefined;

  constructor(private analysisService: AnalysisRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAnalysis();
  }

  getAllAnalysis(): void {
    this.analysisService.listAll().subscribe({
      next: (data: AnalysisRequestDTO[]) => {
        this.analysis = data;
        this.totalRecords = this.analysis.length;
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  onCreateNewAnalysis(): void {
    this.router.navigate(['/newContainer/']);
  }

  onDetails(id: number | undefined): void {
    console.log(id);
    this.router.navigate([`analysisDetails/${id}`]);
  }

  onUpdating(id: number | undefined): void {
    this.router.navigate([`editContainer/${id}`]);
  }

  deleteRecord(id: number | undefined): void {
    console.log(id);
    if (id != undefined) {
      let aviso = confirm('Seguro borraras este registro?');
      if (aviso == true) {
        this.analysisService.delete(id).subscribe({
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
