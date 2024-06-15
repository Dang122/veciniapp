import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../../core/services/incidencias/incidencias.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewIncidenciaComponent } from './modals/new-incidencia/new-incidencia.component';
import { UsersService } from '../../core/services/users/users.service';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss']
})
export class IncidenciasComponent implements OnInit {

  incidencias : any[] = [];
  incidenciaSelect : any;
  pendientes: number = 0;
  enProceso: number = 0;
  completadas: number = 0;
  usuarios: any;
  residencias: any;
  constructor(private incidenciasService : IncidenciasService,private modalService: NgbModal,private userService: UsersService) { }

  ngOnInit() {
    this.getResidencia();
    this.obtenerUsuarios();
    this.getIncidencias();
  }
  sidebarOpen: any;


  getIncidencias() {
    this.incidenciasService.getIncidencias().subscribe({
      next: (datos) => {
        this.incidencias = datos
        this.contarEstados();
      },
      error: (err) => {
        console.error("Error al intentar traer las incidencias:",err);
        
      }
    })
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

  getResidenciaName(id: number): string {
    const residencia = this.residencias.find((res : any) => res.id === id);
    return residencia ? residencia.nombre : 'Desconocido';
  }

  obtenerUsuarios() {

    this.userService.obtenerUsuarios().subscribe(
      (datos : any) =>{
        console.log(datos);
        this.usuarios = datos
      },
      (error) => {


      }
      );
  }

  getUsuarioName(id: number): string {
    const usuario = this.usuarios.find((res: any) => res.id === id);
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : 'Desconocido';
  }
  
  getAdminName(id: number): string {
    const usuario = this.usuarios.find((res: any) => res.id === id);
    return usuario ? `${usuario.nombre}` : 'Desconocido';
  }


  contarEstados() {
    this.pendientes = this.incidencias.filter(incidencia => incidencia.estado === 'Pendiente').length;
    this.enProceso = this.incidencias.filter(incidencia => incidencia.estado === 'En proceso').length;
    this.completadas = this.incidencias.filter(incidencia => incidencia.estado === 'Completada').length;
  }

  abrirModal() {
    const modalRef = this.modalService.open(NewIncidenciaComponent);
    modalRef.componentInstance;
  }

  public openSidebar(incidencia : any): void {
    this.sidebarOpen = true;
    this.incidenciaSelect = incidencia;
  }

  public closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleEstado(event: Event, incidencia: any) {
    event.stopPropagation();

    const estados = ['Pendiente', 'En proceso', 'Completada'];
    const currentIndex = estados.indexOf(incidencia.estado);
    const newIndex = (currentIndex + 1) % estados.length;
    const newEstado = estados[newIndex];

    this.incidenciasService.modificarEstado(incidencia.id, newEstado).subscribe({
      next: (response : any) => {
        incidencia.estado = newEstado;
        this.contarEstados();
        Swal.fire({
          title: 'Éxito',
          text: response.message,
          icon: 'success'
        });
      },
      error: (err : any) => {
        console.error('Error al intentar actualizar el estado de la incidencia:', err);
        Swal.fire({
          title: 'Error',
          text: 'Error al intentar actualizar el estado de la incidencia',
          icon: 'error'
        });
      }
    });
  }

  eliminarIncidencia() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, quiero eliminar la incidencia",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const id_incidencia = this.incidenciaSelect.id;
        this.incidenciasService.deleteIncidencia(id_incidencia).subscribe({
          next: (response) =>{
            this.contarEstados();
            this.incidencias = this.incidencias.filter(incidencia => incidencia.id !== id_incidencia);
            Swal.fire({
              title: 'Éxito',
              text: response.message,
              icon: 'success'
            });
          },
          error: (err) =>{
            console.error('Error al intentar eliminar la incidencia:', err);
            Swal.fire({
              title: 'Error',
              text: 'Error al intentar eliminar la incidencia',
              icon: 'error'
            });
          }
        });
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Lo has cancelado correctamente",
          icon: "error"
        });
      }
    });





  }



  
}


