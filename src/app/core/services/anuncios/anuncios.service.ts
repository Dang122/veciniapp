import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

constructor(private http : HttpClient) { }

private handleError(error: any): Observable<never> {
  console.error('Error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}


getAnunciostodos() : Observable <any>{
  return this.http.get(`${TEST_URL_API}/anuncios`).pipe(
    catchError(this.handleError)
  );
}


getAnuncios() : Observable <any>{
  const authUser = localStorage.getItem('auth_user');
  const residenciaId = authUser ? JSON.parse(authUser).residencia : null; 
  return this.http.get(`${TEST_URL_API}/anuncios/${residenciaId}`).pipe(
    catchError(this.handleError)
  );
}

nuevoAnuncio(formData: FormData) : Observable <any>{
  return this.http.post(`${TEST_URL_API}/anuncios/nuevo-anuncio`, formData).pipe(
    catchError(this.handleError)
  );
}

editarAnuncio(body : any) : Observable <any> {
  return this.http.put(`${TEST_URL_API}/anuncios/editar-anuncio`,body).pipe(
    catchError(this.handleError)
  );
}

eliminarAnuncio(id_anuncio : number) : Observable <any>{
  return this.http.delete(`${TEST_URL_API}/anuncios/eliminar-anuncio/${id_anuncio}`).pipe(
    catchError(this.handleError)
  )
}

getFoto(id_anuncio : any) : Observable <any> {
  return this.http.get(`${TEST_URL_API}/anuncios/ver_imagen/${id_anuncio}`,{ responseType: 'blob' })
}


}
