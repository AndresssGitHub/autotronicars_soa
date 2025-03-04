import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Bienvenido al Dashboard</h1>
    <button (click)="logout()" class="btn btn-danger">Cerrar Sesión</button>
  `,
})
export class DashboardComponent {
  authService = inject(AuthService) as AuthService; // Solución para el error de tipo

  logout(): void {
    this.authService.logout();
  }
}
