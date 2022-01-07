import { Uye } from './../models/uye';
import { Ders } from './../models/dersler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';

  kayitRef: AngularFireList<Ders> = null;
  uyeRef: AngularFireList<Uye> = null;
    constructor(
    public db: AngularFireDatabase,
    public afAuth : AngularFireAuth
  ) 
   {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
   }

  OturumAc(mail:string, parola : string){

    return this.afAuth.signInWithEmailAndPassword(mail,parola);
  }
  OturumKapat(){

    return this.afAuth.signOut();
  } 

  OturumKontrol(){

    if (localStorage.getItem("user")) {
      return true;
      
    }
    else{

      return false;

    }


  }
  
  /* Üye İşlemleri  */

  UyeOl(uye:Uye){


    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);



  }

  UyeEkle(uye:Uye){

    return this.uyeRef.push(uye)


  }






  /* Üye İşlemleri Bitiş */


KayitListele(){
  return this.kayitRef;
}

KayitEkle(kayit: Ders){
  return this.kayitRef.push(kayit);
}

KayitDüzenle(kayit: Ders){

return this.kayitRef.update(kayit.key,kayit);

}

KayitSil(key: string){

  return this.kayitRef.remove(key);
}

KayitByKey(key:string){
  return this.db.object("/Kayitlar/" + key)
}

  
}
