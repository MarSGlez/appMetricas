import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';

import { Firestore, collection, addDoc, collectionData, doc, getDoc, query, where, getDocs } from '@angular/fire/firestore';
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

  
  


  addMetricasListItem( fecha_creacion : string, ruta: string, titulo: string, H: number , N: number, n: number, V: number, D: number, L: number, E: number, T: number, LoC: number, CLoC: number){
    //const tabla = collection(this.firestore, 'metricas');
    const docRef = addDoc(collection(this.firestore, "metricas"), {
      fecha_creacion: fecha_creacion,
      ruta: ruta,
      titulo: titulo,
      H: H,
      N: N,
      n: n,
      V: V,
      D: D,
      L: L,
      E: E,
      T: T,
      LoC: LoC,
      CLoC: CLoC,

    });
    return docRef;
  }

  getMetricasId( titulo: string){
    /*const docRef = doc(this.firestore, "metricas", titulo);
    const documento = getDoc(docRef);*/
    const q = query(collection(this.firestore, "metricas"), where("titulo", "==", titulo));
    const documento = getDocs(q);/*
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return console.log(doc.id, " => ", doc.data());
    });*/
    //return this.firestore.collection('metricas').doc(id).collection('chatlist').snapshotChanges(); return documento;
    return documento;
    
  }

  

}
