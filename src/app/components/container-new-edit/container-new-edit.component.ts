import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerDTO } from '../../models/container-dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ContainerShareService } from '../../services/container-share.service';
import { LiquidService } from '../../services/liquid.service';
import { LiquidDTO } from '../../models/liquid-dto';

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
  liquidList: LiquidDTO[] | undefined;

  constructor(
    private liquidService: LiquidService,
    private containerService: ContainerService,
    private containerShare: ContainerShareService,
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
    this.getLiquidList();
    if (this.isEditing) {
      // Agregar los campos adicionales cuando estás en modo edición
      this.newContainerForm.addControl('containerUsedCapacity', new FormControl('', Validators.required));
      this.newContainerForm.addControl('containerLiquidType', new FormControl('', Validators.required));
      this.newContainerForm.addControl('containerInUse', new FormControl('', Validators.required));
    }
  }

  private checkState(): void {
    const object: ContainerDTO | null = this.containerShare.getContainer();
    if (object?.id) {
      console.log('hay id, estás editando');
      this.isEditing = true;
      this.containerService.details(object.id).subscribe({
        next: (data: ContainerDTO) => {
          this.containerDetails = data;
          this.newContainerForm.patchValue({
            id: object.id,
            containerID: data.name,
            containerCapacity: data.capacity,
            containerMaterial: data.material,
            //admin update
            containerInUse: data.inUse,
            containerLiquidType: data.liquidType,
            containerUsedCapacity: data.usedCapacity
            
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

  getLiquidList():void {
    this.liquidService.listAll().subscribe({
      next: (data: LiquidDTO[]) => {
        this.liquidList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  cancelOperation():void {
      this.router.navigate(['']);
      this.containerShare.removeContainer();
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
          this.newContainerForm.reset();
          this.containerShare.removeContainer();
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
      const object: ContainerDTO | null = this.containerShare.getContainer();
      if (object?.id) {
        const request: ContainerDTO = {
          name: form.value.containerID,
          capacity: form.value.containerCapacity,
          material: form.value.containerMaterial,
          //for complete ADMIN update
          liquidType: form.value.containerLiquidType,
          usedCapacity: form.value.containerUsedCapacity,
          inUse: form.value.containerInUse
        }

        console.log(request);
        this.containerService.update(object?.id, request).subscribe({
          next: (data: any) => {
            alert('Producto actualizado!');
            this.router.navigate(['']);
            this.newContainerForm.reset();
            this.containerShare.removeContainer();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
            console.log(error);
          }
        });
      } else {
        alert('Error parsing reference!');
      }
    }
  }

}
