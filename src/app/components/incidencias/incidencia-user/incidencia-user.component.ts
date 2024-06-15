import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciasService } from '../../../core/services/incidencias/incidencias.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-incidencia-user',
  templateUrl: './incidencia-user.component.html',
  styleUrls: ['./incidencia-user.component.scss']
})
export class IncidenciaUserComponent implements OnInit {
  files: File[] = [];
  incidenceForm: FormGroup;
  incidencias : any[] = [];
  constructor( private fb: FormBuilder, private incidenceService: IncidenciasService) {
    this.incidenceForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getIncidecias();
  }
  
  
  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(): void {
    if (this.incidenceForm.valid) {
      const dataUserJson : any = localStorage.getItem("auth_user");

      const json = JSON.parse(dataUserJson);
      const idUser = json.id;
      const idResidencia = json.residencia;
      const formData = new FormData();
      formData.append('description', this.incidenceForm.value.description);
      formData.append('userId', idUser);
      formData.append('idResidencia', idResidencia);
      formData.append('status', 'Pendiente');
      formData.append('date', new Date().toISOString());

      for (let file of this.files) {
        formData.append('files', file, file.name);
      }
      


      this.incidenceService.createIncidence(formData).subscribe({
        next: (response) => {
          this.incidenceForm.reset();
          this.files = [];
          Swal.fire({
            title: "Correcto",
            text: "La incidencia se ha creado correctamente",
            icon: "success"
          });
          this.getIncidecias();
        },
        error: (error) => {
          console.error('Error al crear la incidencia', error);
        }
        });
      

    }
  }
  
  getIncidecias() {
    this.incidenceService.getIncidenciasUsuario().subscribe({
      next: (datos) =>{
        this.incidencias = datos;
      },
      error: (err) => {
        console.error("Error al intentar traer los datos", err);
        
      }
    })
  }

  eliminarIncidencia(id_incidencia : any) {
    this.incidenceService.deleteIncidencia(id_incidencia).subscribe({
      next: (response) =>{
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
    })
  }


}
