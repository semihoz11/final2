import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  adsoyad : string;
  uid : string;
  secId: string;
  mesaj:string;
  sonuc : boolean;
  constructor(
    public fbServis: FbServisService,
    public router : Router,
    public route : ActivatedRoute

  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    var user2 = JSON.parse(localStorage.getItem("user"));
    this.secId = user2.id;
  }

  OturumKapat(){
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
    })


  }
  gonder(){
    if (this.uid == "RGLOyJvapLTuHJ8GCYm3fNejx5G3") {

      this.router.navigate(['/derslerAdmin'])
      this.sonuc = true;
      this.mesaj = "Giriş Yapılıyor";
      
    }
    else{
      this.sonuc = false
      this.mesaj ="Sadece Admin Yetkisine Sahip Kullanıcılar Girebilir"
      this.router.navigate(['/login'])
    }
  }

}
