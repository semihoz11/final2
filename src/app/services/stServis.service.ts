import { Dosya } from './../models/dosya';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StServisService {
  secDosya : Dosya = new Dosya();
  basePath = "/Dosyalar";

constructor(
  public storage : AngularFireStorage,
  public db : AngularFireDatabase
) { }



DosyaYukleStorage(dosya : Dosya){

  var tarih = new Date ();
  const dosyaYol = this.basePath +"/"+ dosya.file.name;
  const storageRef = this.storage.ref(dosyaYol);
  const yukleTask = this.storage.upload(dosyaYol,dosya.file);
  yukleTask.snapshotChanges().pipe(
    finalize (() => {
     storageRef.getDownloadURL().subscribe(downloadURL => {
      
      dosya.url = downloadURL;
      dosya.adi = dosya.file.name;
      dosya.tarih = tarih.getTime().toString();
      dosya.dersadi = this.secDosya.dersadi;
      dosya.ogradi  = this.secDosya.ogradi;
      this.DosyaVeriYAz(dosya);
     });
   })
  ).subscribe();
  return yukleTask.percentageChanges();



}


DosyaVeriYAz(dosya:Dosya){

this.db.list(this.basePath).push(dosya);

}


DosyaListele(){

  return this.db.list(this.basePath);

}

DosyaSil(dosya:Dosya){

  this.DosyaVeriSil(dosya).then(() => {
    this.DosyaStorageSil(dosya);
  });
 

}
DosyaStorageSil(dosya:Dosya){

  const storageRef = this.storage.ref(this.basePath);
  storageRef.child(dosya.adi).delete();



}
DosyaVeriSil(dosya:Dosya){

return this.db.list(this.basePath).remove(dosya.key); 



}


}
