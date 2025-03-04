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
    // Aquí normalmente harías una solicitud HTTP a tu backend
    // Para este ejemplo, simulamos un token
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem(this.tokenKey, fakeToken); // Almacena el token
    this.router.navigate(['/dashboard']); // Redirige al usuario
  }

  // Simula el registro
  register(email: string, password: string): void {
    // Aquí normalmente harías una solicitud HTTP a tu backend para registrar al usuario
    // Para este ejemplo, simulamos el registro
    this.login(email, password); // Simula el inicio de sesión después del registro
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

  // Obtiene el token (útil para enviarlo en las solicitudes HTTP)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}