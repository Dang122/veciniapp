import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './modals/editar-usuario/editar-usuario.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  residencias: any;

  constructor(private userService : UsersService, private modalService: NgbModal) { }
  usuarios : any[] = []
  searchTerm: string = '';
  ngOnInit() {
    this.obtenerUsuarios();
    this.getResidencia();
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

  filteredUsuarios(): any[] {
    if (!this.searchTerm) {
      return this.usuarios;
    }
    return this.usuarios.filter(user => 
      user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  openModalNewUser() {
    const modalRef = this.modalService.open(NuevoUsuarioComponent,{size: "lg"});
    modalRef.componentInstance.componentInstance.passEntry.subscribe(() => {
      this.obtenerUsuarios();
    });
  }
  openModalEditUser(user : any) {
    const modalRef = this.modalService.open(EditarUsuarioComponent,{size: "lg"});
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.componentInstance.passEntry.subscribe(() => {
      this.obtenerUsuarios();
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

  getResidenciaName(id: number): string {
    const residencia = this.residencias.find((res : any) => res.id === id);
    return residencia ? residencia.nombre : 'Desconocido';
  }

  eliminarUsuario(id_user : any) {
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
      confirmButtonText: "Si, quiero eliminar el usuario",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(id_user).subscribe(
          () => {
            this.usuarios = this.usuarios.filter(usuario => usuario.id !== id_user);
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "El usuario se ha eliminado correctamente",
              icon: "success"
            });
          },
          (error) => {
            console.error("Error al intentar eliminar el usuario", error)
          }
        )
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
  


}
