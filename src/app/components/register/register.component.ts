import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  mostrarError() {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al intentar crear el usuario',
        confirmButtonColor: '#d33'
      });
    }
  
    mostrarExito() {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  
    onRegister(): void {
      console.log("Intentando registrar...");
    
      this.authService.register(this.email, this.password)
        .then(() => {
          console.log("Registro exitoso!");
          this.mostrarExito();
        })
        .catch(error => {
          console.error("Error en el registro:", error);
          this.mostrarError();
        });
    }     
}