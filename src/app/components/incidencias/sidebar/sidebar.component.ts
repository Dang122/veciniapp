import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';
import { IncidenciasService } from '../../../core/services/incidencias/incidencias.service';
import { PreviewImagenComponent } from '../modals/preview/preview.component';
import { Toast } from 'ngx-toastr';
import Swal from 'sweetalert2';
interface Imagen {
  url: string;
  id_imagen : any;
  source: string;
  id_incidencia: any;
  path: any;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() incidencia: any;
  @Input() isActive: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() editClientEvent = new EventEmitter<any>();
  @Output() deleteIncidenciaEvent = new EventEmitter<void>();
  imagenesSeleccionadas: Set<any> = new Set();
  optionsOpen = false;
  showCopy = false;
  isEditing: boolean = false;
  mapOpen = false;
  options: any;
  layers: any;
  map: any;
  imagenes :  Imagen[]  = [];
  private isLoadingImages = false;
  constructor(
    private clipboard: Clipboard,
    private router: Router,
    private modalService: NgbModal,
    private incidenciasService: IncidenciasService,
  ) { }

  
  ngOnInit(): void {
    this.obtenerImagenes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incidencia'] && changes['incidencia'].currentValue) {
      this.obtenerImagenes();
    }
  }


  obtenerImagenes() {
    if (this.isLoadingImages) {
      return;
    }

    this.isLoadingImages = true;
    this.incidenciasService.getImagenes(this.incidencia.id).subscribe(
      (datos: any) => {
        // Limpiar las imágenes existentes para esta incidencia
        this.imagenes = [];
  
        datos.forEach((dato: any) => {
          this.incidenciasService.getImage(dato.id).subscribe(
            (blob) => {
              const url: any = window.URL.createObjectURL(blob);
              // Agregar la imagen al arreglo de imágenes para esta incidencia
              this.imagenes.push({ url, source: blob, id_incidencia: this.incidencia.id,id_imagen: dato.id, path: dato.path });
              this.isLoadingImages = false;

            },
            (error) => {
              console.error("Error al intentar traer las imágenes del CDN", error);
              this.isLoadingImages = false;
            }
          );
        });
      },
      (error) => {
        console.error("Error al intentar traer las imágenes de la incidencia", error);
      }
    );
  }

  enableEditing() {
    this.isEditing = true;
  }

  copyToClipboard(value: string) {
    this.clipboard.copy(value);
  }

  close(): void {
    this.optionsOpen = false;
    this.closeSidebar.emit();
  }

  closeOptions(): void {
    if (this.optionsOpen) {
      this.optionsOpen = false;
    }
  }

  toggleOptions(): void {
    this.optionsOpen = !this.optionsOpen;
  }

  // editClient(): void {
  //   this.editClientEvent.emit(this.client);
  //   this.optionsOpen = false;
  //   this.close();
  // }

  deleteIncidencia(): void {
    this.deleteIncidenciaEvent.emit();
    this.close();
  }


  saveDescription() {
    this.isEditing = false;
    this.incidenciasService.updateDescripcion(this.incidencia.id, this.incidencia.descripcion).subscribe(
      (response) => {
        console.log('Descripción actualizada correctamente');
      },
      (error) => {
        console.error('Error al actualizar la descripción', error);
      }
    );
  }
  

   abrirModal(imagen : any) {
    const modalRef = this.modalService.open(PreviewImagenComponent,{size: "lg"});
    modalRef.componentInstance.imagen = imagen.url;
   }

   
  
  clickImagenn(imagen: any) {
    if (this.imagenesSeleccionadas.has(imagen)) {
      this.imagenesSeleccionadas.delete(imagen);
    } else {
      this.imagenesSeleccionadas.add(imagen);
    }  
    console.log(this.imagenesSeleccionadas);
    
  }

 

  eliminarImagenesSeleccionadas() {
    const imagesEliminar = Array.from(this.imagenesSeleccionadas).map(imagen => ({
      imageId: imagen.id_imagen,
      source: imagen.source,
      id_incidencia: imagen.id_incidencia,
      path: imagen.path
    }));
  
    let deletedCount = 0;
  
    imagesEliminar.forEach(imagen => {
      this.incidenciasService.deleteImagen(imagen.imageId, imagen.id_incidencia, imagen.path).subscribe(
        (mensaje) => {
          // Elimina la imagen del array de imágenes
          this.imagenes = this.imagenes.filter(img => img.id_imagen !== imagen.imageId);
  
          deletedCount++;
          if (deletedCount === imagesEliminar.length) {
            // Limpiar la selección después de eliminar todas las imágenes
            this.imagenesSeleccionadas.clear();
            Swal.fire({
              title: "Correcto",
              text: "Las imágenes han sido eliminadas correctamente",
              icon: "success"
            });
          }
        },
        (error: any) => {
          console.error('Error al intentar eliminar las imágenes en la base de datos:', error);
        }
      );
    });
  }



}
