import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TEST_URL_API } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http : HttpClient) { }

obtenerUsuarios() : Observable <any>{
  return this.http.get(`${TEST_URL_API}/usuarios/`);
}

obtenerDatosUsuario() : Observable <any>{
  const authUser = localStorage.getItem('auth_user');
  const userId = authUser ? JSON.parse(authUser).id : null; 
  return this.http.get(`${TEST_URL_API}/usuarios/${userId}`)
}

// En tu UsersService
editarPerfil(formData: FormData): Observable<any> {
  const authUser = localStorage.getItem('auth_user');
  const userId = authUser ? JSON.parse(authUser).id : null; 
  return this.http.put(`${TEST_URL_API}/usuarios/editar-perfil/${userId}`, formData);
}

nuevoUsuario(body : any) : Observable <any>{
  return this.http.post(`${TEST_URL_API}/usuarios/`,body)
}

editarUsuario(body : any, id_user : any) : Observable <any>{
  return this.http.put(`${TEST_URL_API}/usuarios/${id_user}`,body)
}

eliminarUsuario(id_user : any) : Observable <any>{
  return this.http.delete(`${TEST_URL_API}/usuarios/${id_user}`)
}

getFoto(id_user : any) : Observable <any> {
  return this.http.get(`${TEST_URL_API}/usuarios/ver_imagen/${id_user}`,{ responseType: 'blob' })
}

cambiarContrasena(contrasenaActual: string, nuevaContrasena: string): Observable<any> {
  const authUser = localStorage.getItem('auth_user');
  const userId = authUser ? JSON.parse(authUser).id : null; 
  return this.http.put<any>(`${TEST_URL_API}/usuarios/change-password/${userId}`, { contrasenaActual, nuevaContrasena });
}

getResidencias() : Observable <any>{
  return this.http.get(`${TEST_URL_API}/reservas/obtener-residencias`);
}




}
