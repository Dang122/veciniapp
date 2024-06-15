import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnunciosService } from '../../../core/services/anuncios/anuncios.service';
import Swal from 'sweetalert2';
export interface Ad {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: Date;
  residencia: any;
}
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
@Component({
  selector: 'app-edit-anuncio',
  templateUrl: './edit-anuncio.component.html',
  styleUrls: ['./edit-anuncio.component.scss']
})
export class EditAnuncioComponent implements OnInit {
  @Input() ad: any;
  editAdForm: FormGroup;
  @Output() passEntry: EventEmitter<Ad> = new EventEmitter();
  residencias: any;
  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder, private AnunciosService: AnunciosService, private userService : UsersService) { 
    this.editAdForm = this.fb.group({
      titulo: ["", Validators.required],
      contenido: ["", Validators.required],
      residencia: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.editAdForm = this.fb.group({
      titulo: [this.ad.titulo, Validators.required],
      contenido: [this.ad.contenido, Validators.required],
      residencia: [this.ad.residencia, Validators.required]
    });
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






  editarAnuncio(): void {
    if (this.editAdForm.valid) {
      const updatedAd: Ad = {
        ...this.ad,
        titulo: this.editAdForm.value.titulo,
        contenido: this.editAdForm.value.contenido,
        residencia: this.editAdForm.value.residencia
      };
      
      this.AnunciosService.editarAnuncio(updatedAd).subscribe({
        next: (response) =>{
          this.passEntry.emit(updatedAd);
          Swal.fire({
            title: 'Éxito',
            text: response.message,
            icon: 'success'
          });
          this.activeModal.close();
        },
        error: (err) => {
          console.error("Ha ocurrido algun error al intentar editar el anuncio", err);
          Swal.fire({
            title: 'Error',
            text: 'Error al intentar editar el anuncio',
            icon: 'error'
          })
        }
      })

      // Implementar la lógica para enviar los cambios al servicio
      // this.adService.updateAd(updatedAd).subscribe(...);
    }
  }

}
