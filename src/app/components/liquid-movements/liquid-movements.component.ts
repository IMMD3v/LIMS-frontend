import { Component, OnInit } from '@angular/core';
import { LiquidShareService } from '../../services/liquid-share.service';
import { LiquidDTO } from '../../models/liquid-dto';
import { Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';
import { ContainerService } from '../../services/container.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LiquidIdDTO } from '../../models/liquid-id-dto';
import { LiquidMovementService } from '../../services/liquid-movement.service';

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
    private liquidMovService: LiquidMovementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
    this.getEmptyContainers();
    this.liquidCapture();
  }

  liquidCapture(): void {
    const object: LiquidIdDTO | null = this.liquidShare.getLiquid();
    if (object) {
      this.liquidMovService.capture(object).subscribe({
        next: (data: any) => {
          console.log('ok');
        },
        error: (error: any) => {
          console.log('algo mal ocurrió');
        }
      })
    } else {
      alert('Error of object!')
    }
  }

  getProductDetail(): void {
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

toggleEditable(event: any, itemId: number | undefined): void {
  console.log(event.target.checked);
}

liquidAssignement(event: any, itemId: number | undefined): void {
  console.log(event.target.checked);
}

}
