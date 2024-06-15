import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

constructor(private http : HttpClient) { }

private handleError(error: any): Observable<never> {
  console.error('Error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}



getEspacios() : Observable<any>{
  return this.http.get(`${TEST_URL_API}/reservas/obtener-espacios`).pipe(
    catchError(this.handleError)
  );
}

crearEspacio(espacio: any): Observable<any> {
  return this.http.post<any>(`${TEST_URL_API}/reservas/nuevo-espacio`, espacio);
}

editarEspacio(espacio: any): Observable<any> {
  

  return this.http.put<any>(`${TEST_URL_API}/reservas/editar-espacio`, espacio);
}

eliminarEspacio(id_espacio: number): Observable<any> {
  return this.http.delete(`${TEST_URL_API}/reservas/eliminar-espacio/${id_espacio}`)
    .pipe(
      catchError(this.handleError)
    );
}

}
