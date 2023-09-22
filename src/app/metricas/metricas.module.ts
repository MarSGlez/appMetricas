import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricasComponent } from './metricas.component';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetricasRoutingModule } from './metricas-routing.module';

@NgModule({
  declarations: [MetricasComponent],
  imports: [
    CommonModule,
    MetricasRoutingModule,
    FormsModule,
    IonicModule
  ]
})
export class MetricasModule { }
