import { Dosya } from './../../models/dosya';
import { StServisService } from './../../services/stServis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dersler',
  templateUrl: './dersler.component.html',
  styleUrls: ['./dersler.component.css']
})
export class DerslerComponent implements OnInit {

  kayitlar : any;
  adsoyad : string;
  uid : string;

  dosyalar : Dosya[];

  constructor(
    public fbServis: FbServisService,
    public router : Router,
    public route : ActivatedRoute,
    public stServis : StServisService
  ) { }

  ngOnInit() {
    this.KayitListele();
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.DosyaListele();
  }

  KayitListele(){

    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });


  }
  
  OturumKapat(){
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login'])
    })


  }

  /* Dosya Başlangıç*/


  DosyaListele(){

    this.stServis.DosyaListele().snapshotChanges().subscribe(data => {
      this.dosyalar = [];
      data.forEach(satir => {
        const y = {...satir.payload.toJSON(),key : satir.key};
        this.dosyalar.push(y as Dosya);
      });
    });


  }

  /* Dosya Bitiş*/
}
