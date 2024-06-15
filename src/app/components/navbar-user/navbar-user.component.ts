import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { PerfilComponent } from '../navbar/perfil/perfil.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  constructor(private router: Router,private usersService: UsersService, private modalService : NgbModal) { }
  nombreUsuario : any;
  urlFoto: any;
  optionsOpen = false;
  ngOnInit() {
    const userData = localStorage.getItem("auth_user");
    if (userData) {
      const user = JSON.parse(userData);
      this.nombreUsuario = user.name;
      this.getImagen(user.id);
    } else {
      // Manejar el caso en el que no se encuentre el usuario autenticado
      console.error("No se ha encontrado ningún usuario autenticado en el almacenamiento local.");
    }
    console.log(this.nombreUsuario);
    
  }

  getImagen(id_user : any) : void {
    this.usersService.getFoto(id_user).subscribe({
      next: (blob) =>{
        const url: any = window.URL.createObjectURL(blob);
        this.urlFoto = url;
      },
      error: (err : any) => {

      }
    })
  }

  abrirModal() {
    const modalRef = this.modalService.open(PerfilComponent,{size : 'lg'});
    modalRef.componentInstance;
  }

  toggleOptions(): void {
    this.optionsOpen = !this.optionsOpen;
  }
  logout(){
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
    this.router.navigate(["auth"]);
  }

}
