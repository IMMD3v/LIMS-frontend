import { Component } from '@angular/core';
import { AnalysisRequestDTO } from '../../../models/analysis-req-dto';
import { AnalysisRequestService } from '../../../services/analysis-request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AnalysisReqShareService } from '../../../services/analysis-req-share.service';

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

  constructor(
    private analysisService: AnalysisRequestService,
    private analysisShare: AnalysisReqShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAnalysis();
  }

  getAllAnalysis(): void {
    this.analysisService.listAll().subscribe({
      next: (data: AnalysisRequestDTO[]) => {
        console.log(data)
        this.analysis = data;
        console.log(this.analysis);
        this.totalRecords = this.analysis.length;
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  onCreateNewAnalysis(): void {
    this.router.navigate(['/newAnalysis/']);
  }

  onDetails(item: AnalysisRequestDTO): void {
    this.analysisShare.setAnalysis(item);
    this.router.navigate(['analysisDetails']);
  }

  onUpdating(item: AnalysisRequestDTO): void {
    this.analysisShare.setAnalysis(item);
    this.router.navigate(['editAnalysis']);
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
