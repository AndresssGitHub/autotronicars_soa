import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'; 
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  constructor(
    private auth: Auth, 
    private router: Router,
    private firestore: Firestore 
  ) {
    // Actualizar el observable cuando cambia el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  // Iniciar sesión con Firebase
  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      
      // Si llega aquí, el login fue exitoso
      this.router.navigate(['/dashboard']); 
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false; // Devolvemos false si el login falla
    }
  }  

  // Registrar un nuevo usuario con Firebase
  async register(email: string, password: string, userData?: any): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Si hay datos adicionales, guardarlos en Firestore
      if (userData) {
        await this.saveUserData(userCredential.user.uid, {
          email,
          ...userData,
          createdAt: new Date()
        });
      }
      
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error; // Importante para que el `catch` en `onRegister()` lo capture
    }
  }  

  // Guardar datos del usuario en Firestore
  async saveUserData(userId: string, userData: any): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      throw error;
    }
  }

  // Obtener datos del usuario desde Firestore
  async getUserData(userId: string): Promise<any> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
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

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
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