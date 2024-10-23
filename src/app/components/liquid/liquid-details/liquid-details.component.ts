import { Component } from '@angular/core';
import { LiquidDTO } from '../../../models/liquid-dto';
import { LiquidService } from '../../../services/liquid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LiquidShareService } from '../../../services/liquid-share.service';

@Component({
  selector: 'app-liquid-details',
  standalone: true,
  imports: [],
  templateUrl: './liquid-details.component.html',
  styleUrl: './liquid-details.component.css'
})
export class LiquidDetailsComponent {

  liquidDetails: LiquidDTO | undefined;
  isVolumeDepleted: boolean = false;

  constructor(
    private router: Router,
    private liquidShare: LiquidShareService
  ) {}

  ngOnInit(): void {
    this.getLiquidDetails();
    this.checkVolume();
  }

  getLiquidDetails() {
    const object: LiquidDTO | null = this.liquidShare.getLiquid();
    if (object) {
          this.liquidDetails = object;
    }
  }

  cancelOperation():void {
    this.router.navigate(['']);
    this.liquidShare.removeLiquid();
}

  onLiquidMovements(item: LiquidDTO): void {
    this.liquidShare.setLiquid(item);
    this.router.navigate(['liquidMovements']);
  }

  checkVolume(): void {
    const object: LiquidDTO | null = this.liquidShare.getLiquid();
    if (object?.actualVolume == 0) {
          this.isVolumeDepleted = true;
    }
  }

}
