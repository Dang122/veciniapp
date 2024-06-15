import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidenciasService } from '../../../../core/services/incidencias/incidencias.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../../core/services/users/users.service';
@Component({
  selector: 'app-new-incidencia',
  templateUrl: './new-incidencia.component.html',
  styleUrls: ['./new-incidencia.component.scss']
})
export class NewIncidenciaComponent implements OnInit {
  incidenceForm: FormGroup;
  files: File[] = [];
  residencias: any;
  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder, private incidenceService: IncidenciasService,private userService : UsersService) {
    this.incidenceForm = this.fb.group({
      description: ['', Validators.required],
      residencia: ['',Validators.required]
    });
   }

  ngOnInit() {
    this.getResidencia();
  }

  onSubmit(): void {
    if (this.incidenceForm.valid) {
      const dataUserJson : any = localStorage.getItem("auth_user");

      const json = JSON.parse(dataUserJson);
      const idUser = json.id
      
      const formData = new FormData();
      formData.append('description', this.incidenceForm.value.description);
      formData.append('userId', idUser);
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
          this.activeModal.close('Close click')
        },
        error: (error) => {
          console.error('Error al crear la incidencia', error);
        }
        });
      

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


  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
