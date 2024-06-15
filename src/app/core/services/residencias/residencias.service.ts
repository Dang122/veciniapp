import { Injectable } from '@angular/core';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResidenciasService {

constructor(private http : HttpClient) { }


crearResidencia(residencia: any): Observable<any> {
  return this.http.post(`${TEST_URL_API}/reservas/nueva-residencia`, residencia);
}

eliminarResidencia(id: number): Observable<any> {
  return this.http.delete<any>(`${TEST_URL_API}/reservas/eliminar-residencia/${id}`);
}

editarResidencia(residencia: any) : Observable<any>{
  return this.http.put<any>(`${TEST_URL_API}/reservas/editar-residencia`,residencia);
}


}
