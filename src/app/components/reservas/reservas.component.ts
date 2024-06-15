import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ReservasService } from '../../core/services/reservas/reservas.service';
import { EspaciosService } from '../../core/services/espacios/espacios.service';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  reservasForm: FormGroup;
  espacios: any[] = [];
  reservas: any[] = [];
  reservasAnteriores : any[] = [];
  horasDisponibles: string[] = [];
  minDate: string | undefined;
  constructor(private fb: FormBuilder, private reservasService: ReservasService, private espaciosService : EspaciosService) {  
    this.reservasForm = this.fb.group({
    espacio: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
  });}

  ngOnInit() {
    this.minDate = this.formatDate(new Date());
    this.getEspacios();
    this.obtenerHistorial();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  getEspacios(): void{
    this.espaciosService.getEspacios().subscribe({
      next: (response) => {
        this.espacios = response;
        console.log(this.espacios);
        
      },
      error: (err) => {
        console.error("Error al intentar obtener los espacios comunes", err);
      }
    })
  }

  obtenerHistorial(): void {
    this.reservasService.getReservasAnteriores().subscribe({
     next: (response) => {
        this.reservasAnteriores = response;
    },
    error: (err) => {
      console.error("Error al intentar obtener el historial", err);
    }
    });
  }



  onFechaChange(event: any): void {
    const fecha = this.reservasForm.get('fecha')?.value;
    const idEspacio = this.reservasForm.get('espacio')?.value;
    if (fecha && idEspacio) {
      this.getHoras(fecha, idEspacio);
    }
  }

  onEspacioChange(event: any): void {
    const fecha = this.reservasForm.get('fecha')?.value;
    const idEspacio = this.reservasForm.get('espacio')?.value;
    if (fecha && idEspacio) {
      this.getHoras(fecha, idEspacio);
    }
  }

  getHoras(fecha: string, idEspacio: string): void {
    this.reservasService.getHoras(fecha, idEspacio).subscribe({
      next: (response) => {
        this.horasDisponibles = response;
      },
      error: (err) => {
        console.error('Error al intentar obtener las horas disponibles', err);
      }
    });
  }

  onSubmit(): void {
    const authUser = localStorage.getItem('auth_user');
    const userId = authUser ? JSON.parse(authUser).id : null; 
    const email =  authUser ? JSON.parse(authUser).email : null
    if (this.reservasForm.valid) {
      const formData = { ...this.reservasForm.value, id_usuario: userId, email: email };
      console.log(formData);
      this.reservasService.createReserva(formData).subscribe({
        next: (response: any) => {
          Swal.fire('Reserva creada', 'Su reserva ha sido creada con éxito', 'success');
          this.obtenerHistorial();
          this.horasDisponibles = [];
          this.reservasForm.reset();
        },
        error:
        (error: any) => {
          Swal.fire('Error', 'No se pudo crear la reserva', 'error');
        }
      });
    }
  }

 

}
