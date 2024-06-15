import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EspaciosService } from '../../../../core/services/espacios/espacios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-espacio',
  templateUrl: './editar-espacio.component.html',
  styleUrls: ['./editar-espacio.component.css']
})
export class EditarEspacioComponent implements OnInit {
  espacioForm: FormGroup;
  residencias: any[] = [];
  @Input() espacio : any;
  constructor(public activeModal : NgbActiveModal, private espaciosService: EspaciosService, private fb: FormBuilder,private userService: UsersService) { 
    this.espacioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      residencia: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getResidencia();
    this.espacioForm.patchValue({ 
      id: this.espacio.id,
      nombre: this.espacio.nombre,
      descripcion: this.espacio.descripcion,
      residencia: this.espacio.residencia,
    });
  }

  getResidencia() : void{
    this.userService.getResidencias().subscribe({
      next: (response) => {
        this.residencias = response
      },
      error: (err) => {
        console.error("Error al intentar obtener las residencias", err);
        
      }
    })
  }  

  editarEspacio(): void {
    if (this.espacioForm.valid) {
      this.espaciosService.editarEspacio(this.espacioForm.value).subscribe({
        next: () => {
          this.activeModal.close('success');
          Swal.fire('Éxito', 'Espacio editado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al editar el espacio', err);
          Swal.fire('Error', 'Error al editar el espacio', 'error');
        }
      });
    }
  }

}
