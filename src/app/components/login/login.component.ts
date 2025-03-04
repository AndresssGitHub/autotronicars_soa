import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], // Agrega RouterLink aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password);
  }
}