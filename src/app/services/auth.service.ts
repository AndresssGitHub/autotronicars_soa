import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Iniciar sesión con Firebase
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    }
  }

  // Registrar un nuevo usuario con Firebase
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert('Error al crear la cuenta');
    }
  }

  // Cerrar sesión con Firebase
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  // Observador para el estado de autenticación
  initAuthListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', user.email);
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    });
  }
}