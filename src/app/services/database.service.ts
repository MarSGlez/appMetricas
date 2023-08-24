import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';

import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  

  constructor(
    private firestore: Firestore
  ) { }

  getTallerList(){
    const tabla = collection(this.firestore, 'talleres');
    return collectionData(tabla);
  }
}
