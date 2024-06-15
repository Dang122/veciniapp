import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { IncidenciasService } from '../../../../core/services/incidencias/incidencias.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-preview-imagen',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class PreviewImagenComponent implements OnInit {
  @Input() imagen: any;
  fileUrl: any;
  mimeType: any;
  isLoading = false;

  constructor(private incidenciasService : IncidenciasService, private cdr: ChangeDetectorRef, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.fileUrl = this.imagen
   this.cdr.markForCheck();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.imagen && changes.imagen.currentValue) {
  //     this.fileUrl = "";
  //     this.mimeType = "";
  //     this.openFile(changes.imagen.currentValue);
  //     this.cdr.markForCheck();
  //   }
  // }


  openFile(imagen: any) {
        // Asigna el tipo MIME usando la función que tú definas
        this.fileUrl = imagen;
        this.cdr.detectChanges();
        // Finalizar el indicador de carga
        this.isLoading = false;
  }


  // determineMimeType(filename : any): string {
  //   const mimeTypes = {
  //     'pdf': 'application/pdf',
  //     'jpg': 'image/jpeg',
  //     'jpeg': 'image/jpeg',
  //     'png': 'image/png',
  //     'mp4': 'video/mp4',
  //     'mp3': 'audio/mpeg',
  //     'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //     'doc': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //     //... otros tipos de archivo
  //   };

  //   const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  //   return mimeTypes[fileExtension] || 'unknown';
  // }

  cerrarModal() {
    $('#PreviewImagenModal').modal('hide'); // Oculta la modal utilizando jQuery
  }




  getFileIconClass(fileType: string): string {
    const extension = fileType.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'fa fa-file-image txt-primary';
      case 'zip':
      case 'rar':
        return 'fa fa-file-archive txt-secondary';
      case 'xls':
      case 'xlsx':
        return 'fa fa-file-excel txt-success';
      case 'txt':
        return 'fa fa-file-text txt-info';
      case 'pdf':
        return 'fa fa-file-pdf txt-danger';
      case 'mp4':
      case 'mkv':
      case 'avi':
      case 'mov':
        return 'fa fa-file-video txt-warning';
      case 'docx':
        return 'fa fa-file-word txt-warning';
      default:
        return 'fa fa-file';
    }
  }

  getDocsViewerUrl(fileUrl: string): string {
    return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
  }
}
