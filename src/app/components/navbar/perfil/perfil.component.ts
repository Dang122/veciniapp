import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  usuario: any ;
  files: File[] = [];
  constructor(private usersService : UsersService,private fb : FormBuilder, public activeModal: NgbActiveModal, private modalService : NgbModal) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: '', // Se debe manejar la edición de contraseña de manera segura
      telefono: '',
      direccion:'',
    });
   }

  ngOnInit() {
    this.obtenerDatos();
   
  }

  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }




  obtenerDatos() : void{
    this.usersService.obtenerDatosUsuario().subscribe(
      {
      
        next: (response) =>{
          this.usuario = response
          console.log(this.usuario);

          this.perfilForm.patchValue({ 
            nombre: this.usuario.nombre,
            apellidos: this.usuario.apellidos,
            email: this.usuario.email,
            telefono: this.usuario.telefono,
            direccion: this.usuario.direccion,
            foto: this.usuario.foto // Puedes mostrar la imagen actual aquí si la necesitas
          });
        },
        error: (err) => {
          console.error("Error al intentar obtener los datos del usuario", err);
          
        }
      }
    )
  }

  abrirModal() {
    const modalRef = this.modalService.open(ChangePasswordComponent,{size : 'lg'});
    modalRef.componentInstance;
    this.activeModal.close('Close click');
  }
  
 // En tu componente donde está definido onSubmit y editarPerfil
 onSubmit(): void {
  if (this.perfilForm.valid) {
    const formData = new FormData();


    formData.append('nombre', this.perfilForm.value.nombre);
    formData.append('apellidos', this.perfilForm.value.apellidos);
    formData.append('email', this.perfilForm.value.email);
    formData.append('telefono', this.perfilForm.value.telefono);
    formData.append('direccion', this.perfilForm.value.direccion);
    
    // Agregar la foto solo si está presente
    if (this.files.length > 0) {
      formData.append('foto', this.files[0]);
    }

    this.usersService.editarPerfil(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'El perfil se ha actualizado correctamente',
          icon: 'success'
        });
        this.activeModal.close('Close click');
      },
      error: (err) => {
        console.error("Error al intentar actualizar el perfil", err);
      }
    });
  }
}






}
