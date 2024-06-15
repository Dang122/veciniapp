import { Component, OnInit } from '@angular/core';
import { EspaciosService } from '../../core/services/espacios/espacios.service';
import { ReservasService } from '../../core/services/reservas/reservas.service';
import { UsersService } from '../../core/services/users/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEspacioComponent } from './modals/new-espacio/new-espacio.component';
import { EditarEspacioComponent } from './modals/editar-espacio/editar-espacio.component';
import Swal from 'sweetalert2';
import { EditarReservaComponent } from './modals/editar-reserva/editar-reserva.component';
@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.component.html',
  styleUrls: ['./reservas-admin.component.scss']
})
export class ReservasAdminComponent implements OnInit {
  reservas: any[] = [];
  espacios : any;
  usuarios: any
  p: number = 1;
  constructor(private espaciosService : EspaciosService, private reservasService : ReservasService,private userService : UsersService,private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.getObtenerEspacios();
    this.getReservas();
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

  getReservas() {
    this.reservasService.getReservas().subscribe({
      next: (response) => {
        this.reservas = response
      },
      error: (err) => {
        console.error("Error al intentar traer los espacios comunes", err);
        
      }
    })
  }

  getUsuarioName(id: number): string {
    const usuario = this.usuarios.find((res: any) => res.id === id);
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : 'Desconocido';
  }
  
  getEspacioName(id: number): string {
    const espacio = this.espacios.find((res: any) => res.id === id);
    return espacio ? `${espacio.nombre}` : 'Desconocido';
  }


  obtenerUsuarios() {

    this.userService.obtenerUsuarios().subscribe(
      (datos : any) =>{
        this.usuarios = datos
      },
      (error) => {
      }
      );
  }


  eliminarReserva(id_reserva: number): void {
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
        this.reservasService.eliminarReserva(id_reserva).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La reserva se ha sido eliminado.', 'success');
            this.getReservas(); // Vuelve a cargar los anuncios
          },
          error: (err: any) => {
            console.error('Error al eliminar la reserva', err);
            Swal.fire('Error', 'Error al eliminar la reserva', 'error');
          }
        });
      }
    });
  }

  eliminarEspacio(id_espacio: number): void {
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
        this.espaciosService.eliminarEspacio(id_espacio).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El espacio se ha sido eliminado.', 'success');
            this.getObtenerEspacios(); // Vuelve a cargar los anuncios
          },
          error: (err: any) => {
            console.error('Error al eliminar el espacio', err);
            Swal.fire('Error', 'Error al eliminar el espacio', 'error');
          }
        });
      }
    });
  }


  openModalAddEspacio(): void {
    const modalRef = this.modalService.open(NewEspacioComponent);
    modalRef.componentInstance.espacioCreado.subscribe(() => {
      this.getObtenerEspacios();
    });
  }

  openModalEditReserva(reserva: any): void {
    const modalRef = this.modalService.open(EditarReservaComponent);
    modalRef.componentInstance.reserva = reserva;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getReservas();
      }
    }, (reason) => {});
  }


  openModalEditEspacio(espacio: any): void {
    const modalRef = this.modalService.open(EditarEspacioComponent);
    modalRef.componentInstance.espacio = espacio;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getObtenerEspacios();
      }
    }, (reason) => {});
  }

}






