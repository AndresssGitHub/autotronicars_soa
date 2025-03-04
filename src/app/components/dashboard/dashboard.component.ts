import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink], // Agrega RouterLink aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}