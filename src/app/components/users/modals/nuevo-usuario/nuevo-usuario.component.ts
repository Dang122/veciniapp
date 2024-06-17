import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from '../../../../core/services/users/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {
  public formulario: FormGroup;
  selectedFile: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  residencias : any

  @ViewChild('nombre') nombreField!: ElementRef;
  @ViewChild('apellidos') apellidosField!: ElementRef;
  @ViewChild('email') emailField!: ElementRef;
  @ViewChild('telefono') telefonoField!: ElementRef;
  @ViewChild('rol') rolField!: ElementRef;
  @ViewChild('clave') claveField!: ElementRef;
  @ViewChild('residenciaId') residenciaField!: ElementRef;
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
    this.getResidencia();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  focusNext(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    console.log("entra aqui");
    
    const formElements = [
      this.nombreField,
      this.apellidosField,
      this.emailField,
      this.telefonoField,
      this.rolField,
      this.claveField,
      this.residenciaField,
    ];
  
    const index = formElements.findIndex(el => el.nativeElement === event.target);
    if (index >= 0 && index < formElements.length - 1) {
      formElements[index + 1].nativeElement.focus();
      event.preventDefault(); // Evita que se realice la acción por defecto del evento (como enviar el formulario)
    }
  }

  generarClaveAleatoria(): void {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      clave += caracteres[randomIndex];
    }
    this.formulario.patchValue({ clave });
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

  onSubmit(): void {
    if (this.formulario.valid) {
      const formData = new FormData();
      const formValues = this.formulario.value;

      formData.append('nombre', formValues.nombre);
      formData.append('apellidos', formValues.apellidos);
      formData.append('email', formValues.email);
      formData.append('telefono', formValues.telefono);
      formData.append('rol', formValues.rol);
      formData.append('clave',formValues.clave);
      formData.append('residencia',formValues.residencia);
      if (this.selectedFile) {
        formData.append('profileImage', this.selectedFile, this.selectedFile.name);
      }

      this.userService.nuevoUsuario(formData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Éxito',
            text: response.message,
            icon: 'success'
          });
          this.activeModal.close('success');
        },
        error: (err) => {
          console.error('Ha ocurrido un error al intentar crear un nuevo usuario', err);
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al intentar crear un nuevo usuario',
            icon: 'error'
          });
        }
      });
    }
  }


}
