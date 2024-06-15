import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidenciasService } from '../../core/services/residencias/residencias.service';
import { UsersService } from '../../core/services/users/users.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarResidenciaComponent } from './editar-residencia/editar-residencia.component';
 // Ajusta según la ubicación de tu servicio

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html',
  styleUrls: ['./residencias.component.css']
})
export class ResidenciasComponent implements OnInit {
  residenciaForm: FormGroup;
  residencias: any[] = []; // Supongamos que esta es tu lista de residencias

  constructor(private fb: FormBuilder, private residenciaService: ResidenciasService,private userService : UsersService, private modalService: NgbModal) {
    this.residenciaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.residenciaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.getResidencia(); // Método para obtener la lista de residencias
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

  editarResidencia(residencia: any): void {
    const modalRef = this.modalService.open(EditarResidenciaComponent);
    modalRef.componentInstance.residencia = residencia;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getResidencia();
      }
    }, (reason) => {});
  }

  crearResidencia() {
    if (this.residenciaForm.valid) {
      const nuevaResidencia = this.residenciaForm.value;
      this.residenciaService.crearResidencia(nuevaResidencia).subscribe(
        () => {
          this.getResidencia();
          this.residenciaForm.reset();
          Swal.fire('Éxito', 'Residencia creada correctamente', 'success');
        },
        error => {
          console.error('Error al crear la residencia', error);
        }
      );
    }
  }





  eliminarResidencia(id_reserva: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.residenciaService.eliminarResidencia(id_reserva).subscribe({
          next: () => {
            this.getResidencia();
            Swal.fire('Eliminado', 'La residencia se ha sido eliminado.', 'success');
          },
          error: (err: any) => {
            console.error('Error al eliminar la residencia', err);
            Swal.fire('Error', 'Error al eliminar la residencia', 'error');
          }
        });
      }
    });
  }

  

}
