import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnunciosService } from '../../../core/services/anuncios/anuncios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../../core/services/users/users.service';
export interface Ad {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: Date;
  residencias : any;
}
@Component({
  selector: 'app-new-anuncio',
  templateUrl: './new-anuncio.component.html',
  styleUrls: ['./new-anuncio.component.scss']
})
export class NewAnuncioComponent implements OnInit {
  files: File[] = [];
  newAdForm: FormGroup;
  residencias : any;
  @Output() passEntry: EventEmitter<Ad> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder, private AnunciosService: AnunciosService,private userService : UsersService) {
    this.newAdForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      residencia: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.getResidencia();
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




  crearAnuncio(): void {
    if (this.newAdForm.valid) {
      const formData = new FormData();
      const dataUserJson : any = localStorage.getItem("auth_user");

      const json = JSON.parse(dataUserJson);
      const idUser = json.id
      
      
      formData.append('titulo',this.newAdForm.value.titulo);
      formData.append('contenido',this.newAdForm.value.contenido);
      formData.append('residencia',this.newAdForm.value.residencia)
      formData.append('file',this.files[0]);
      formData.append('id_admin', idUser);
      this.AnunciosService.nuevoAnuncio(formData).subscribe({
        next: (response)=>{
          this.passEntry.emit();
          this.activeModal.close('Close click')
          Swal.fire({
            title: 'Éxito',
            text: response.message,
            icon: 'success'
          });
        },
        error: (err) =>{
          console.error("Ha ocurrido un error al intentar crear un nuevo anuncio", err);
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al intentar crear un nuevo anuncio',
            icon: 'error'
          });
        }
      })
     
    }
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.newAdForm.patchValue({ imagen: file });
    }
  }

  
  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }



}
