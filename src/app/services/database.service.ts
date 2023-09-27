import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';

import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
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

  getTallerList(){
    const tabla = collection(this.firestore, 'talleres');
    return collectionData(tabla);
  }

  addMetricasListItem( origen : string, destinatario: string, chatItem: any){
    const tabla = collection(this.firestore, 'metricas');
    //return this.firestore.collection('chats').doc(origen).collection('chatlist').doc(destinatario).set( chatItem);  
    

 }

  

}
