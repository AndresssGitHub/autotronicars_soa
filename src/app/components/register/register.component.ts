import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Solo ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const { email, password, name } = this.registerForm.value;
        
        // Registro con datos adicionales para Firestore
        await this.authService.register(email, password, {
          displayName: name,
          role: 'user',
          photoURL: '',
        });

        // Redirigir al usuario después del registro
        this.router.navigate(['/dashboard']); // Cambia '/dashboard' por la ruta que desees
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'El correo electrónico ya está en uso.';
        } else if (error.code === 'auth/weak-password') {
          this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else {
          this.errorMessage = 'Error al registrar usuario. Inténtalo de nuevo.';
        }
        console.error('Error detallado:', error);
      } finally {
        this.loading = false;
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}