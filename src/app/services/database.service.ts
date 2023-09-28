import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';

import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})



export class DatabaseService {
  private readonly storage: Storage = inject(Storage);

  constructor(
    private firestore: Firestore,
    //private storage: AngularFireStorageModule,
    private storageD: Storage
  ) { }

  getMetricasList(){
    const tabla = collection(this.firestore, 'metricas');
    return collectionData(tabla);
  }

  addMetricasListItem( fecha_creacion : string, ruta: string, titulo: string){
    //const tabla = collection(this.firestore, 'metricas');
    const docRef = addDoc(collection(this.firestore, "metricas"), {
      fecha_creacion: fecha_creacion,
      ruta: ruta,
      titulo: titulo
    });
    return docRef;
  }

  getMetricasId( titulo: string){
    const docRef = doc(this.firestore, "metricas", titulo);
    const documento = getDoc(docRef);
    //return this.firestore.collection('metricas').doc(id).collection('chatlist').snapshotChanges();
    return documento;
    
  }

  

}
