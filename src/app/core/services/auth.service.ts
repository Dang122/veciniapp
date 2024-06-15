import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TEST_URL_API } from '../../../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http : HttpClient) { }

  login(user : any) : Observable <any> {
    return this.http.post(`${TEST_URL_API}/login/`,user);
  }
  


}
