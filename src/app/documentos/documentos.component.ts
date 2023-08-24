import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent  implements OnInit {

  constructor(
    public popoverController: PopoverController,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    this.db.getTallerList().subscribe( talleres => {
      talleres.map( taller => {
       console.log(taller)
      })
    })
  }

}
