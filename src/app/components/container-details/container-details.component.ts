import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';

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
    private containerService: ContainerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.containerService.details(id).subscribe({
        next: (data: ContainerDTO) => {
          this.containerDetails = data;
          console.log(this.containerDetails);
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
