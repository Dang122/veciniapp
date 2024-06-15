import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from '../../../../core/services/users/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  formulario: FormGroup;
  @Input()  user : any ;
  residencias: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private userService : UsersService) { 
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
      clave: ['', Validators.required],
      residencia: ['',Validators.required]
      }); 
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: [this.user?.nombre || '', Validators.required],
      apellidos: [this.user?.apellidos || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      telefono: [this.user?.telefono || '', Validators.required],
      rol: [this.user?.rol || '', Validators.required],
      clave: [this.user?.password, Validators.required],
      residencia: [this.user?.residencia,Validators.required]
    });
    this.getResidencia();
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      const id_user = this.user.id
      this.userService.editarUsuario(this.formulario.value,id_user).subscribe(
        () => {
          Swal.fire({
            title: "Correcto",
            text: "El usuario se ha modificado correctamente",
            icon: "success"
          });
          this.passEntry.emit()
          this.activeModal.close()
        },
        (error) =>{
          console.log("Error al intentar hacer un nuevo usuario:", error);
          
        }
        
      )
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
