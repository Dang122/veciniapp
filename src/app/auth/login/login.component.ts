import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginForm: FormGroup;
public show: boolean = false;
public errorMessage: string = '';
password: any;
email: any;

@ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor( 
    private authService : AuthService,
    private fb: FormBuilder, 
    private router: Router) { 
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }); }

  ngOnInit() {
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      
      const user = this.loginForm.value;
      this.authService.login(user).subscribe(
        response => {
          this.handleSuccess(response);
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  focusPasswordInput() {
    this.passwordInput.nativeElement.focus();
  }


  handleSuccess(response: any): void {
    const authUser: any = {
      token: response.token,
      id: response.datos.id,
      name: response.datos.name,
      email: response.datos.email,
      rol: response.datos.rol,
      residencia: response.datos.residencia
    };
    localStorage.setItem('token', response.token);
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    this.redirectUser(authUser.rol);
  }

  handleError(error: any): void {
    console.error(error);
    if (error.status === 401) {
      this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
    } else {
      this.errorMessage = error.message || 'Algo malo ocurrió; por favor, inténtalo de nuevo más tarde.';
    }
  }

  redirectUser(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(["components/dashboard"]);
        break;
      case 'user':
        this.router.navigate(["components/dashboard-user"]);
        break;
      default:
        this.router.navigate(["/login"]);
        break;
    }
  }



}
