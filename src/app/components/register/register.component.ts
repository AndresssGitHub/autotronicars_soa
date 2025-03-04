import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink], // Agrega FormsModule y RouterLink
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí normalmente harías una solicitud HTTP a tu backend para registrar al usuario
    // Para este ejemplo, simulamos el registro
    this.authService.login(this.email, this.password); // Simula el inicio de sesión después del registro
    this.router.navigate(['/dashboard']); // Redirige al usuario al dashboard
  }
}