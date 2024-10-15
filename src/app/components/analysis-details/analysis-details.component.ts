import { Component } from '@angular/core';
import { AnalysisRequestDTO } from '../../models/analysis-req-dto';
import { AnalysisRequestService } from '../../services/analysis-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AnalysisReqShareService } from '../../services/analysis-req-share.service';
import { ContainerService } from '../../services/container.service';
import { ContainerDTO } from '../../models/container-dto';
import { LiquidService } from '../../services/liquid.service';
import { LiquidDTO } from '../../models/liquid-dto';

@Component({
  selector: 'app-analysis-details',
  standalone: true,
  imports: [],
  templateUrl: './analysis-details.component.html',
  styleUrl: './analysis-details.component.css'
})
export class AnalysisDetailsComponent {

  analysisDetails: AnalysisRequestDTO | undefined;
  liquidMap: {[key: string]: string} = {};
  containerMap: {[key: string]: string} = {};

  constructor(
    private analysisService: AnalysisRequestService,
    private liquidService: LiquidService,
    private containerService: ContainerService,
    private analysisShare: AnalysisReqShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnalysisDetail();
    this.getAllContainers();
    this.getAllLiquids();
  }

  getAnalysisDetail() {
    const object: AnalysisRequestDTO | null = this.analysisShare.getAnalysis();
    if (object) {
          this.analysisDetails = object;
          console.log(this.analysisDetails);
    }
  }

  getAllContainers(): void {
    this.containerService.listAll().subscribe({
      next: (data: ContainerDTO[]) => {
        data.forEach(
          container => {
          this.containerMap[container.id!] = container.name;
        })
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  getAllLiquids(): void {
    this.liquidService.listAll().subscribe({
      next: (data: LiquidDTO[]) => {
        data.forEach(
          liquid => {
          this.liquidMap[liquid.id!] = liquid.description;
        })
      },
      error: (error: any) => {
        console.log('error fetching data!');
      }
    })
  }

  getContainerName(containerId: number | undefined): string {
    return this.containerMap[containerId!] || 'no asignado';
  }

  getLiquidName(liquidId: number | undefined): string {
    return this.liquidMap[liquidId!] || 'no asignado';
  }

  cancelOperation():void {
    this.router.navigate(['']);
    this.analysisShare.removeAnalysis();
}

}
