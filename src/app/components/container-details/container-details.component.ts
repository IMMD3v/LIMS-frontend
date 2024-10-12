import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';
import { ContainerShareService } from '../../services/container-share.service';

@Component({
  selector: 'app-container-details',
  standalone: true,
  imports: [],
  templateUrl: './container-details.component.html',
  styleUrl: './container-details.component.css'
})
export class ContainerDetailsComponent implements OnInit {
  containerDetails: ContainerDTO | undefined;

  constructor(
    private containerShare: ContainerShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContainerDetails();
  }

  getContainerDetails() {
    const object: ContainerDTO | null = this.containerShare.getContainer();
    if (object) {
          this.containerDetails = object;
          console.log(this.containerDetails);
    }
  }

  cancelOperation():void {
      this.router.navigate(['']);
      this.containerShare.removeContainer();
  }
}
