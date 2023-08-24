import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosComponent } from './documentos.component';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosRoutingModule } from './documentos-routing.module';


@NgModule({
  declarations: [DocumentosComponent],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    FormsModule,
    IonicModule,
    DocumentosRoutingModule
  ]
})
export class DocumentosModule { }
