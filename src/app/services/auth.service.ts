import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private router: Router) {}

  // Simula el inicio de sesión
  login(email: string, password: string): void {
    //Solicitud HTTP a tu backend
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem(this.tokenKey, fakeToken); // Almacena el token
    this.router.navigate(['/dashboard']); // Redirige al usuario
  }

  // Simula el registro
  register(email: string, password: string): void {
    //Solicitud HTTP a tu backend para registrar al usuario
    this.login(email, password);
  }

  // Cierra la sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Elimina el token
    this.router.navigate(['/login']); // Redirige al usuario
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Verifica si hay un token
  }

  // Obtiene el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}