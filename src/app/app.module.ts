import { DerslerdetayComponent } from './components/derslerdetay/derslerdetay.component';
import { LoginComponent } from './components/login/login.component';
import { DerslerAdminComponent } from './components/derslerAdmin/derslerAdmin.component';
import { DerslerComponent } from './components/dersler/dersler.component';
import { environment } from './../environments/environment';
import { HomeComponent } from './components/Home/Home.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DerslerComponent,
    DerslerAdminComponent,
    LoginComponent,
    DerslerdetayComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
