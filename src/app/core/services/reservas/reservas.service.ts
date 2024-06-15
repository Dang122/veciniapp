import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

constructor(private http : HttpClient) { }

private handleError(error: any): Observable<never> {
  console.error('Error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}

createReserva(body : any): Observable <any>{
  return this.http.post(`${TEST_URL_API}/reservas/guardar-reserva`,body).pipe(
    catchError(this.handleError)
  );
}

getHoras(fecha: string, idEspacio: string): Observable<string[]> {
  return this.http.get<{ horasDisponibles: string[] }>(`${TEST_URL_API}/reservas/horas-disponibles?fecha=${fecha}&idEspacio=${idEspacio}`)
    .pipe(
      map(response => response.horasDisponibles)
    );
}

getReservasAnteriores(): Observable<any>{
  const authUser = localStorage.getItem('auth_user');
  const userId = authUser ? JSON.parse(authUser).id : null; 
  return this.http.get(`${TEST_URL_API}/reservas/reservas-anteriores/${userId}`).pipe(
    catchError(this.handleError)
  );
}

getReservas(): Observable<any>{
  return this.http.get(`${TEST_URL_API}/reservas/obtener-reservas`).pipe(
    catchError(this.handleError)
  );
}


editarReserva(reserva: any): Observable<any> {
  return this.http.put<any>(`${TEST_URL_API}/reservas/editar-reserva`, reserva);
}

eliminarReserva(id_reserva: number): Observable<any> {
  return this.http.delete(`${TEST_URL_API}/reservas/eliminar-reserva/${id_reserva}`)
    .pipe(
      catchError(this.handleError)
    );
}


}
