import Swal from 'sweetalert2';
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
  mostrarError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al enviar el enlace. Verifica tu correo electrónico.',
      confirmButtonColor: '#d33'
    });
  }

  // Mostrar alerta de éxito
  mostrarExito() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  mostrarError2(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      confirmButtonColor: '#d33'
    });
  }
  

  // Enviar enlace para restablecer la contraseña
  async onSubmit(): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.mostrarExito();
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error al enviar el enlace:', error);
  
      // Verificar si el error es por usuario no encontrado
      if (error.code === 'auth/user-not-found') {
        this.mostrarError2('No hay ninguna cuenta asociada a este correo.');
      } else {
        this.mostrarError();
      }
    }
  }

  //async onSubmit(): Promise<void> {
    //try {
      //await sendPasswordResetEmail(this.auth, this.email);
      //alert('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');
      //this.router.navigate(['/login']);
    //} catch (error) {
      //console.error('Error al enviar el enlace:', error);
      //alert('Error al enviar el enlace. Verifica tu correo electrónico.');
   // }
  //}
}
