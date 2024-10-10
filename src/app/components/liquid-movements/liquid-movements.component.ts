import { Component, OnInit } from '@angular/core';
import { LiquidShareService } from '../../services/liquid-share.service';
import { LiquidDTO } from '../../models/liquid-dto';
import { Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';
import { ContainerService } from '../../services/container.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-liquid-movements',
  standalone: true,
  imports: [],
  templateUrl: './liquid-movements.component.html',
  styleUrl: './liquid-movements.component.css'
})
export class LiquidMovementsComponent implements OnInit{

  liquidDetails: LiquidDTO | undefined;
  emptyContainers: ContainerDTO[] | undefined;

  constructor(
    private liquidShare: LiquidShareService,
    private containerService: ContainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
    this.getEmptyContainers();
  }

  getProductDetail() {
    const object: LiquidDTO | null = this.liquidShare.getLiquid();
    if (object) {
      console.log(object)
      this.liquidDetails = object;
    } else {
      alert('Error of object!')
    }
  }
  
  getEmptyContainers(): void {
    this.containerService.listAllEmpty().subscribe({
      next: (data: ContainerDTO[]) => {
        this.emptyContainers = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })

  }

  cancelOperation():void {
    this.router.navigate(['']);
}

onDetails(id: number | undefined): void {
  console.log(id);
  this.router.navigate([`contDetails/${id}`]);
}

}
