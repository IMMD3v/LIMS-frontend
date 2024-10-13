import { Component } from '@angular/core';
import { AnalysisRequestDTO } from '../../models/analysis-req-dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalysisRequestService } from '../../services/analysis-request.service';
import { AnalysisReqShareService } from '../../services/analysis-req-share.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LiquidService } from '../../services/liquid.service';
import { LiquidDTO } from '../../models/liquid-dto';

@Component({
  selector: 'app-analysis-new-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './analysis-new-edit.component.html',
  styleUrl: './analysis-new-edit.component.css'
})
export class AnalysisNewEditComponent {

  isEditing: boolean = false;
  analysisDetails: AnalysisRequestDTO | undefined;
  newAnalysisForm: FormGroup;
  liquidList: LiquidDTO[] | undefined;

  constructor(
    private liquidService: LiquidService,
    private analysisService: AnalysisRequestService,
    private analysisShare: AnalysisReqShareService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newAnalysisForm = this.formBuilder.group({
      requestedBy: ['', Validators.required],
      liquid: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.checkState();
    this.getLiquidList();
    if (this.isEditing) {
      // Agregar los campos adicionales cuando estás en modo edición
      this.newAnalysisForm.addControl('status', new FormControl('', Validators.required));
      this.newAnalysisForm.addControl('requestDate', new FormControl('', Validators.required));
      this.newAnalysisForm.addControl('completionDate', new FormControl('', Validators.required));
      this.newAnalysisForm.addControl('pH', new FormControl('', Validators.required));
      this.newAnalysisForm.addControl('turbidity', new FormControl('', Validators.required));
    }
  }

  private checkState(): void {
    const object: AnalysisRequestDTO | null = this.analysisShare.getAnalysis();
    if (object?.id) {
      console.log('hay id, estás editando');
      this.isEditing = true;
      this.analysisService.details(object.id).subscribe({
        next: (data: AnalysisRequestDTO) => {
          this.analysisDetails = data;
          this.newAnalysisForm.patchValue({
            id: object.id,
            requestedBy: data.requestedBy,
            liquid: data.liquid,
            //admin update
            status: data.status,
            requestDate: data.requestDate,
            completionDate: data.completionDate,
            pH: data.ph,
            turbidity: data.turbidity,
            
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
      this.analysisShare.removeAnalysis();
  }

  public createAnalysis() {
    if (this.newAnalysisForm.valid) {
      const request: AnalysisRequestDTO = {   
        requestedBy: this.newAnalysisForm.value.requestedBy,
        liquid: this.newAnalysisForm.value.liquid
      }
      console.log(request);
      this.analysisService.create(request).subscribe({
        //luego de suscribirnos al evento, si la respuesta es positiva
        next: (data:any) => {
          alert('Registro creado!');
          this.router.navigate(['']);
          this.newAnalysisForm.reset();
          this.analysisShare.removeAnalysis();
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

  updateAnalysis(form: FormGroup) {
    if (form.invalid) {
      alert('Hay errores en el formulario!');
    } else {
      const object: AnalysisRequestDTO | null = this.analysisShare.getAnalysis();
      if (object?.id) {
        const request: AnalysisRequestDTO = {
          liquid: form.value.liquid,
          requestedBy: form.value.requestedBy,
          completionDate: form.value.completionDate,
          requestDate: form.value.requestDate,
          status: form.value.status,
          //analysis protocol
          ph: form.value.pH,
          turbidity: form.value.turbidity
        }

        console.log(request);
        this.analysisService.update(object?.id, request).subscribe({
          next: (data: any) => {
            alert('Producto actualizado!');
            this.router.navigate(['']);
            this.newAnalysisForm.reset();
            this.analysisShare.removeAnalysis();
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
