import { Component } from '@angular/core';
import { LiquidDTO } from '../../models/liquid-dto';
import { LiquidService } from '../../services/liquid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LiquidShareService } from '../../services/liquid-share.service';

@Component({
  selector: 'app-liquid-details',
  standalone: true,
  imports: [],
  templateUrl: './liquid-details.component.html',
  styleUrl: './liquid-details.component.css'
})
export class LiquidDetailsComponent {

  liquidDetails: LiquidDTO | undefined;

  constructor(
    private liquidService: LiquidService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private liquidShare: LiquidShareService
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      // this.isEditing = true;
      this.liquidService.details(id).subscribe({
        next: (data: LiquidDTO) => {
          this.liquidDetails = data;
          console.log(this.liquidDetails);
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

  onLiquidMovements(item: LiquidDTO): void {
    this.liquidShare.setLiquid(item);
    this.router.navigate(['liquidMovements']);
  }

}
