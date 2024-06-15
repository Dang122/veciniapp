import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

constructor(private http : HttpClient) { }

getIncidencias() : Observable <any>{
  return this.http.get(`${TEST_URL_API}/incidencias/`).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: any): Observable<never> {
  console.error('Error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}

createIncidence(formData: FormData): Observable<any> {
  return this.http.post(`${TEST_URL_API}/incidencias/crear_incidencia`, formData);
}

getImagenes(id_incidencia : any) : Observable <any> {
  return this.http.get(`${TEST_URL_API}/incidencias/imagenes_incidencia/${id_incidencia}`).pipe(
    catchError(this.handleError)
  );
}

getImage(id_imagen : any) : Observable <any>{
  return this.http.get(`${TEST_URL_API}/incidencias/ver_imagen/${id_imagen}`,{ responseType: 'blob' }).pipe(
    catchError(this.handleError)
  );
}

deleteImagen(imageId: number, id_incidencia: number, path: string): Observable<any> {
  const params = new HttpParams()
    .set('imageId', imageId)
    .set('id_incidencia', id_incidencia.toString())
    .set('path', path);
  
  return this.http.delete(`${TEST_URL_API}/incidencias/delete-imagen-cita`, { params }).pipe(
    catchError(this.handleError)
  );
}

modificarEstado(id_incidencia: number, status: string): Observable<any> {
  return this.http.put(`${TEST_URL_API}/incidencias/modificar_estado`, { id_incidencia, status }).pipe(
    catchError(this.handleError)
  );
}

getIncidenciasUsuario() : Observable<any>{
  const dataUserJson : any = localStorage.getItem("auth_user");
  const json = JSON.parse(dataUserJson);
  const idUser = json.id
  return this.http.get(`${TEST_URL_API}/incidencias/incidencias-usuario/${idUser}`).pipe(
    catchError(this.handleError)
  );
}

deleteIncidencia(id_incidencia : any) : Observable <any>{
  return this.http.delete(`${TEST_URL_API}/incidencias/delete/${id_incidencia}`).pipe(
    catchError(this.handleError)
  );
}

updateDescripcion(id: number, descripcion: string): Observable<any> {
  return this.http.put(`${TEST_URL_API}/incidencias/${id}/descripcion`, { descripcion });
}


}
