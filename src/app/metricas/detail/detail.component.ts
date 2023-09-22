import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {
  destinatario: string | null;
  constructor(private route: ActivatedRoute,) { 
    this.destinatario = this.route.snapshot.paramMap.get('programaId');
  }

  ngOnInit() {
    console.log(this.destinatario)
  }

}
