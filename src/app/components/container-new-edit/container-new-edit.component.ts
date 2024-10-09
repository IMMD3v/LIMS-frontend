import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-container-new-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './container-new-edit.component.html',
  styleUrl: './container-new-edit.component.css'
})
export class ContainerNewEditComponent implements OnInit{

  isEditing: boolean = false;
  containerDetails: ContainerDTO | undefined;
  newContainerForm: FormGroup;

  constructor(
    private containerService: ContainerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newContainerForm = this.formBuilder.group({
      containerID: ['', Validators.required],
      containerCapacity: ['', Validators.required],
      containerMaterial: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.checkState();
  }

  private checkState(): void {
    const recordId: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(id);
    if (recordId != 0) {
      console.log('hay id, estás editando');
      this.isEditing = true;
      this.containerService.details(recordId).subscribe({
        next: (data: ContainerDTO) => {
          this.containerDetails = data;
          this.newContainerForm.patchValue({
            id: recordId,
            containerID: data.name,
            containerCapacity: data.capacity,
            containerMaterial: data.material,
            containerAvailability: data.inUse
          })
        },
        error: (error: HttpErrorResponse) => {
          alert('Error al obtener los detalles del registro!');
          console.log(error.message);
        }
      });
    } else {
      console.log('id es 0, estas creando');
    }
    console.log('end of method');
  }

  cancelOperation():void {
      this.router.navigate(['']);
  }

  public createContainer() {
    if (this.newContainerForm.valid) {
      const request: ContainerDTO = {   
        name: this.newContainerForm.value.containerID,
        capacity: this.newContainerForm.value.containerCapacity,
        material: this.newContainerForm.value.containerMaterial
      }
      
      this.containerService.create(request).subscribe({
        //luego de suscribirnos al evento, si la respuesta es positiva
        next: (data:any) => {
          alert('Registro creado!');
          this.router.navigate(['']);
          console.log(data);
          this.newContainerForm.reset();
        },
        //en cambio si produce un error:
        error: (error: HttpErrorResponse) => {
          console.log(error);
          alert('Error al registrar!');
        }
      });
    } else {
      alert('Hay un error en el formulario!');
    }
    console.log('end of method');
  }

  updateContainer(form: FormGroup) {
    if (form.invalid) {
      alert('Hay errores en el formulario!');
    } else {
    const itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    const request: ContainerDTO = {
      name: form.value.containerID,
      capacity: form.value.containerCapacity,
      material: form.value.containerMaterial
    }
    console.log(itemId);
      this.containerService.update(itemId!, request).subscribe({
        next: (data: any) => {
          alert('Producto actualizado!');
          this.router.navigate(['']);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error);
        }
      });
    }
  }

}
