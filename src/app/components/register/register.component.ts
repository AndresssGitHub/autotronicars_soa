import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink], 
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

    //Solicitud HTTP a tu backend para registrar al usuario
    this.authService.login(this.email, this.password); 
    this.router.navigate(['/dashboard']); 
  }
}