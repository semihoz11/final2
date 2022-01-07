import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ders } from 'src/app/models/dersler';

@Component({
  selector: 'app-derslerdetay',
  templateUrl: './derslerdetay.component.html',
  styleUrls: ['./derslerdetay.component.css']
})
export class DerslerdetayComponent implements OnInit {

  key : string;
  secDers : Ders = new Ders();

  constructor(
    public router : Router,
    public fbServis: FbServisService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      this.key = p.key;
      this.KayitGetir();
    })

  }

  KayitGetir(){
    this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data => {
      const y = {...data.payload.toJSON(), key: this.key};
      this.secDers = (y as Ders);
    })
  }

}
