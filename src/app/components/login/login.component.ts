import { Sonuc } from './../../models/sonuc';
import { Router, RouterModule } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sonuc : Sonuc = new Sonuc();
  sonuc2 : boolean = false;

  constructor(
    public fbservis : FbServisService,
    public router : Router
  ) { }

  ngOnInit() {
  }

  GirisYap(mail : string,parola : string){
    
    this.fbservis.OturumAc(mail,parola).then(d => {
      
      if (d.user) {

        localStorage.setItem("user", JSON.stringify(d.user))
        this.router.navigate(['/'])
      }

    },err =>{ 
        this.sonuc.islem = false;
         this.sonuc.mesaj = "E-Posta Veya Şifre Hatalı Lütfen Tekrar Giriş Yapınız"

    })
  }


  GosterGizle(){
    if (this.sonuc2==true) {
      this.sonuc2=false;
    }
    else{
      this.sonuc2 = true;
    }

  }

}
