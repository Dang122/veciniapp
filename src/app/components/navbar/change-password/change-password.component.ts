import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  cambioContrasenaForm: FormGroup;
  constructor(private usersService : UsersService,private fb : FormBuilder, public activeModal: NgbActiveModal, private modalService : NgbModal) {
    this.cambioContrasenaForm = this.fb.group({
      contrasenaActual: ['', Validators.required],
      nuevaContrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.cambioContrasenaForm.valid) {
      const contrasenaActual = this.cambioContrasenaForm.value.contrasenaActual;
      const nuevaContrasena = this.cambioContrasenaForm.value.nuevaContrasena;
      const confirmarContrasena = this.cambioContrasenaForm.value.confirmarContrasena;

      if (nuevaContrasena !== confirmarContrasena) {
        Swal.fire({
          title: 'Error',
          text: 'La nueva contraseña y la confirmación no coinciden',
          icon: 'error'
        });
        return;
      }

      // Llamar al servicio para cambiar la contraseña
      this.usersService.cambiarContrasena(contrasenaActual, nuevaContrasena).subscribe({
        next: () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Contraseña cambiada exitosamente',
            icon: 'success'
          });
          this.cambioContrasenaForm.reset();
          this.activeModal.close('Close click');
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al intentar cambiar la contraseña',
            icon: 'error'
          });
          console.error('Error al cambiar la contraseña', err);
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos',
        icon: 'error'
      });
    }
  }

}


