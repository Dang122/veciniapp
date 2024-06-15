import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './perfil/perfil.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  optionsOpen = false;

  constructor(private router: Router,private usersService: UsersService, private modalService : NgbModal) { }
  nombreUsuario : any;
  urlFoto: any;
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

  toggleOptions(): void {
    this.optionsOpen = !this.optionsOpen;
  }

  logout(){
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
    this.router.navigate(["auth"]);
  }

  abrirModal() {
    const modalRef = this.modalService.open(PerfilComponent,{size : 'lg'});
    modalRef.componentInstance;
  }

}
