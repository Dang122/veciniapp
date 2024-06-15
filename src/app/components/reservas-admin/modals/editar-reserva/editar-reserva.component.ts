import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservasService } from '../../../../core/services/reservas/reservas.service';
import { UsersService } from '../../../../core/services/users/users.service';
import { EspaciosService } from '../../../../core/services/espacios/espacios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {
  @Input() reserva: any;

  editReservaForm: FormGroup;
  vecinos: any;
  espacios: any;
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private espaciosService : EspaciosService, private reservasService : ReservasService,private userService : UsersService) { this.editReservaForm = this.fb.group({
      id: [''],
      espacio: ['', Validators.required],
      vecino: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    }); }

  ngOnInit() {
    this.getObtenerEspacios();
    this.obtenerUsuarios();
    if (this.reserva) {
      console.log(this.reserva);
      
      this.editReservaForm.patchValue({ 
        id: this.reserva.id,
        espacio: this.reserva.id_espacio,
        vecino: this.reserva.id_vecino,
        fecha: this.reserva.fecha,
        hora: this.reserva.hora,
      });
    }

  }

  editarReserva(): void {
    if (this.editReservaForm.valid) {
      this.reservasService.editarReserva(this.editReservaForm.value).subscribe({
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


  
  obtenerUsuarios() {

    this.userService.obtenerUsuarios().subscribe(
      (datos : any) =>{
        this.vecinos = datos
      },
      (error) => {
      }
      );
  }

  getObtenerEspacios() {
    this.espaciosService.getEspacios().subscribe({
      next: (response) => {
        this.espacios = response
      },
      error: (err) => {
        console.error("Error al intentar traer los espacios comunes", err);
        
      }
    })
  }
}