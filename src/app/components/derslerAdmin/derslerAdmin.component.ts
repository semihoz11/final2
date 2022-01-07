import { StServisService } from './../../services/stServis.service';
import { Dosya } from './../../models/dosya';

import { Router } from '@angular/router';
import { Uye } from './../../models/uye';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';

import { Component, OnInit } from '@angular/core';
import { Ders } from 'src/app/models/dersler';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-derslerAdmin',
  templateUrl: './derslerAdmin.component.html',
  styleUrls: ['./derslerAdmin.component.css']
})
export class DerslerAdminComponent implements OnInit {
  dosyalar : Dosya[];
  secDosya : Dosya = new Dosya();
  files : FileList;
  kayitlar: any;
  secDers : Ders = new Ders();
  sonuc : Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  adsoyad : string;
  uid : string;
  secId: string;
  
  constructor(
    public fbServis: FbServisService,
    public router: Router,
    public stServis : StServisService
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.secDers.key = null;
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
  KayitDuzenle(kayit : Ders ){
    Object.assign(this.secDers, kayit)

  }
  KayitSil(kayit : Ders){
    this.fbServis.KayitSil(kayit.key).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Silindi"

    })


  }
  Vazgec(){
    this.secDers = new Ders();
    this.secDers.key = null;
  }

  Kaydet(){
    if (this.secDers.key==null) {
      this.fbServis.KayitEkle(this.secDers).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Yeni Ders Eklendi"
      })  
      
    }
    else {
      this.fbServis.KayitDüzenle(this.secDers).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Kaydı Düzenlendi"
      }) 
    }



  }

  OturumuKapat(){
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login'])
    })
  }

  /* ogr kaydı */

  KayitYap()  {

     this.fbServis.UyeOl(this.secUye).then(d=> {
       d.user.updateProfile({
         displayName:this.secUye.adsoyad
       });
       this.secUye.uid = d.user.uid;
       this.UyeEkle();



     },err => {

      this.sonuc.islem = false;
      this.sonuc.mesaj ="Kayıt İşleminde Hata Oluştu Tekrar Deneyiniz";

     })
      


  }

  UyeEkle(){

    this.fbServis.UyeEkle(this.secUye).then(d => {


    })
  }

  /* ogr kaydı bitiş */


  /* Dosya İşlemleri Başlangıç */

  DosyaListele(){

    this.stServis.DosyaListele().snapshotChanges().subscribe(data => {
      this.dosyalar = [];
      data.forEach(satir => {
        const y = {...satir.payload.toJSON(),key : satir.key};
        this.dosyalar.push(y as Dosya);
      });
    });


  }


  DosyaSec(e : any){

    this.files = e.target.files;

  }

  DosyaYukle(){

   var dosya = new Dosya();
   dosya.file = this.files[0];
  
   this.stServis.secDosya.dersadi = this.secDosya.dersadi;
   this.stServis.secDosya.ogradi = this.secDosya.ogradi;
   this.stServis.DosyaYukleStorage(dosya).subscribe(
     p => {
       console.log("Yüklendi");
     }, err => {
       console.log("Hata")
     }
   );


  }


  DosyaSil(dosya:Dosya){
    this.stServis.DosyaSil(dosya);


  }
  

  
  /* Dosya İşlemleri Bitiş */
}
