import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Metricas } from 'src/app/interface/metricas';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss'],
})
export class MetricasComponent  implements OnInit {

  metricasD: Metricas[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getMetricasList().subscribe(documents => {
      // Convierte cada DocumentData en un objeto Metricas
      this.metricasD = documents.map(doc => {
        return {
          ruta: doc['ruta'],
          fecha_creacion: doc['fecha_creacion'],
          titulo: doc['titulo'],
          // Agrega otras propiedades de Metricas si es necesario
        };
      });
      console.log(this.metricasD);
    });
  }
 
    

  

 

}
