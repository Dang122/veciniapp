import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../core/services/anuncios/anuncios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewAnuncioComponent } from './new-anuncio/new-anuncio.component';
import { EditAnuncioComponent } from './edit-anuncio/edit-anuncio.component';
import Swal from 'sweetalert2';
import { UsersService } from '../../core/services/users/users.service';
export interface Ad {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: Date;
  residencia : any;
}

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
  ads: Ad[] = [];
  anunciosFiltrados: Ad[] = []; // Lista de anuncios filtrados
  residencias: any;

  constructor(private adService: AnunciosService, private modalService: NgbModal,private userService : UsersService) { }

  ngOnInit() {
    this.loadAds();
    this.getResidencia();
  }

  loadAds(): void {
    this.adService.getAnunciostodos().subscribe({
      next: (data: Ad[]) => {
        this.ads = data;
        this.anunciosFiltrados = data; // Inicialmente, los anuncios filtrados son los mismos que los cargados
      },
      error: (error) => {
        console.error('Error fetching ads:', error);
      }
    });
  }

  buscarAnuncios(terminoBusqueda: string): void {
    // Filtrar los anuncios que coincidan con el término de búsqueda
    this.anunciosFiltrados = this.ads.filter(anuncio =>
      anuncio.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      anuncio.contenido.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }

  openModalNewAd(): void {
    const modalRef = this.modalService.open(NewAnuncioComponent);
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.loadAds()
    });
  }

  openModalEditAd(ad: Ad): void {
    const modalRef = this.modalService.open(EditAnuncioComponent);
    modalRef.componentInstance.ad = ad;
    modalRef.componentInstance.passEntry.subscribe((updatedAd: Ad) => {
      const index = this.ads.findIndex(a => a.id === updatedAd.id);
      if (index !== -1) {
        this.ads[index] = updatedAd;
      }
    });
  }

  eliminarAnuncio(id_anuncio : number) : void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, quiero eliminar el anuncio",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.adService.eliminarAnuncio(id_anuncio).subscribe({
          next: (response) =>{
            this.ads = this.anunciosFiltrados.filter(ad => ad.id !== id_anuncio);
            this.loadAds()
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
        });
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Lo has cancelado correctamente",
          icon: "error"
        });
      }
    });
    

    
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

  getResidenciaName(id: number): string {
    const residencia = this.residencias.find((res : any) => res.id === id);
    return residencia ? residencia.nombre : 'Desconocido';
  }


}
