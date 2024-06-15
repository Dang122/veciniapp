import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../core/services/anuncios/anuncios.service';
import { Observable, forkJoin, tap } from 'rxjs';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  anuncios : any[] = [];
  imagenes : any[] = []
  constructor(private anunciosService : AnunciosService) { }

  ngOnInit() {
    this.getAnuncios();
  }

  
  getAnuncios(): void {
    this.anunciosService.getAnuncios().subscribe({
      next: (response) => {
        this.anuncios = response;
        console.log(this.anuncios);
        
        // Crear un array de observables para todas las llamadas a getImagen
        const observables = this.anuncios.map(anuncio => this.getImagen(anuncio.id));
        
        // Combinar todos los observables en uno solo
        forkJoin(observables).subscribe({
          next: () => {
            // Todas las llamadas a getImagen se han completado
            console.log('Todas las imágenes han sido cargadas');
            console.log(this.imagenes);
          },
          error: (err) => {
            console.error('Error al obtener las imágenes:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al intentar obtener los anuncios:', err);
      }
    });
  }
  
  getImagen(id_anuncio: any): Observable<any> {
    return this.anunciosService.getFoto(id_anuncio).pipe(
      tap(blob => {
        const url: any = window.URL.createObjectURL(blob);
        if (!this.imagenes[id_anuncio]) {
          this.imagenes[id_anuncio] = [];
        }
        this.imagenes[id_anuncio].push(url);
      })
    );
  }
  

}
