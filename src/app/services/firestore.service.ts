import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, DocumentReference, DocumentData, CollectionReference, QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  // Obtener una colección completa
  getCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }

  // Obtener documentos con filtros
  getDocumentsWithQuery(collectionName: string, ...queryConstraints: QueryConstraint[]): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const q = query(collectionRef, ...queryConstraints);
    return collectionData(q, { idField: 'id' });
  }

  // Obtener un documento específico
  async getDocument(collectionName: string, docId: string): Promise<any> {
    const docRef = doc(this.firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  }

  // Añadir un nuevo documento con ID generado
  async addDocument(collectionName: string, data: any): Promise<string> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  }

  // Actualizar un documento existente
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }

  // Crear o actualizar un documento con ID conocido
  async setDocument(collectionName: string, docId: string, data: any, merge: boolean = true): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date()
    }, { merge });
  }

  // Eliminar un documento
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    await deleteDoc(docRef);
  }
}