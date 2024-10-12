import { Component } from '@angular/core';
import { LiquidDTO } from '../../models/liquid-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LiquidService } from '../../services/liquid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LiquidShareService } from '../../services/liquid-share.service';

@Component({
  selector: 'app-liquid-new-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './liquid-new-edit.component.html',
  styleUrl: './liquid-new-edit.component.css'
})
export class LiquidNewEditComponent {

  isEditing: boolean = false;
  liquidDetails: LiquidDTO | undefined;
  newLiquidForm: FormGroup;

  constructor(
    private liquidService: LiquidService,
    private liquidShare: LiquidShareService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newLiquidForm = this.formBuilder.group({
      description: ['', Validators.required],
      origin: ['', Validators.required],
      originalVolume: ['', Validators.required],
      batch: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.checkState();
  }

  private checkState(): void {
    const object: LiquidDTO | null = this.liquidShare.getLiquid();
    if (object?.id) {
      console.log('hay id, estás editando');
      this.isEditing = true;
      this.liquidService.details(object.id).subscribe({
        next: (data: LiquidDTO) => {
          this.liquidDetails = data;
          this.newLiquidForm.patchValue({
            id: object?.id,
            description: data.description,
            origin: data.origin,
            originalVolume: data.originalVolume,
            batch: data.batch
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
    this.liquidShare.removeLiquid();
}

  public createLiquid() {
    if (this.newLiquidForm.valid) {
      const request: LiquidDTO = {   
        description: this.newLiquidForm.value.description,
        origin: this.newLiquidForm.value.origin,
        originalVolume: this.newLiquidForm.value.originalVolume,
        batch: this.newLiquidForm.value.batch,
      }
      
      this.liquidService.create(request).subscribe({
        //luego de suscribirnos al evento, si la respuesta es positiva
        next: (data:any) => {
          alert('Registro creado!');
          this.router.navigate(['']);
          this.newLiquidForm.reset();
          this.liquidShare.removeLiquid();
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

  updateLiquid(form: FormGroup) {
    if (form.invalid) {
      alert('Hay errores en el formulario!');
    } else {
      const object: LiquidDTO | null = this.liquidShare.getLiquid();
      if (object?.id) {
        const request: LiquidDTO = {
          description: form.value.description,
          origin: form.value.origin,
          originalVolume: form.value.originalVolume,
          batch: form.value.batch
        }
        this.liquidService.update(object.id, request).subscribe({
          next: (data: any) => {
            alert('Producto actualizado!');
            this.router.navigate(['']);
            this.newLiquidForm.reset();
            this.liquidShare.removeLiquid();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
            console.log(error);
          }
        });
      }
    }
  }

}
