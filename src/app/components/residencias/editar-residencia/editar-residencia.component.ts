import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResidenciasService } from '../../../core/services/residencias/residencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-residencia',
  templateUrl: './editar-residencia.component.html',
  styleUrls: ['./editar-residencia.component.css']
})
export class EditarResidenciaComponent implements OnInit {
  residenciaForm: FormGroup;
  @Input() residencia : any;
  constructor(public activeModal : NgbActiveModal, private fb: FormBuilder, private residenciaService : ResidenciasService) {
    this.residenciaForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.residenciaForm.patchValue({
      id: this.residencia.id,
      nombre: this.residencia.nombre,
      direccion: this.residencia.direccion,
    });
  }

  editarResidencia(): void {
    if (this.residenciaForm.valid) {
      this.residenciaService.editarResidencia(this.residenciaForm.value).subscribe({
        next: () => {
          this.activeModal.close('success');
          Swal.fire('Éxito', 'Residencia editada correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al editar la residencia', err);
          Swal.fire('Error', 'Error al editar la residencia', 'error');
        }
      });
    }
  }





}
