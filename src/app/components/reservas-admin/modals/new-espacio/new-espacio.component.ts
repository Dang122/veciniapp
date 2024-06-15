import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EspaciosService } from '../../../../core/services/espacios/espacios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-espacio',
  templateUrl: './new-espacio.component.html',
  styleUrls: ['./new-espacio.component.css']
})
export class NewEspacioComponent implements OnInit {
  espacioForm: FormGroup;
  residencias: any[] = [];
  @Output() espacioCreado = new EventEmitter<void>();
  constructor(public activeModal : NgbActiveModal, private espaciosService: EspaciosService, private fb: FormBuilder,private userService: UsersService) {
    this.espacioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      residencia: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.getResidencia();
    
   
  }

  onSubmit(): void {
    if (this.espacioForm.valid) {
      this.espaciosService.crearEspacio(this.espacioForm.value).subscribe({
        next: () => {
          this.activeModal.close('success');
          this.espacioCreado.emit();
          Swal.fire('Éxito', 'Espacio creado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al crear el espacio', err);
          Swal.fire('Error', 'Error al crear el espacio', 'error');
        }
      });
    }
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


}
