import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule], 
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit(): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      alert('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al enviar el enlace:', error);
      alert('Error al enviar el enlace. Verifica tu correo electrónico.');
    }
  }
}
