import { Component } from '@angular/core';
import { AnalysisRequestDTO } from '../../models/analysis-req-dto';
import { AnalysisRequestService } from '../../services/analysis-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analysis-details',
  standalone: true,
  imports: [],
  templateUrl: './analysis-details.component.html',
  styleUrl: './analysis-details.component.css'
})
export class AnalysisDetailsComponent {

  analysisDetails: AnalysisRequestDTO | undefined;

  constructor(
    private analysisService: AnalysisRequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnalysisDetail();
  }

  getAnalysisDetail() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      // this.isEditing = true;
      this.analysisService.details(id).subscribe({
        next: (data: AnalysisRequestDTO) => {
          this.analysisDetails = data;
          console.log(this.analysisDetails);
          // this.newItemForm.patchValue({
          //   id: Number(this.activatedRoute.snapshot.paramMap.get('id')),
          //   itemName: data.itemName,
          //   itemSellPrice: data.itemSellPrice,
          //   itemStock: data.itemStock
          // });
        },
        error: (error: HttpErrorResponse) => {
          alert('Error al obtener los detalles del producto!');
          console.log(error.message);
        },
      });
    }
  }

  cancelOperation():void {
      this.router.navigate(['']);
  }

}
