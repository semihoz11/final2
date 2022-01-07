import { DerslerdetayComponent } from './components/derslerdetay/derslerdetay.component';
import { LoginComponent } from './components/login/login.component';
import { DerslerAdminComponent } from './components/derslerAdmin/derslerAdmin.component';
import { DerslerComponent } from './components/dersler/dersler.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/Home.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const redirectLogin = () => redirectUnauthorizedTo(['/login'])
const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'derslerUser', component: DerslerComponent},
  {path: 'derslerAdmin',component: DerslerAdminComponent , canActivate:[AngularFireAuthGuard],data:{authGuardPipe : redirectLogin}},
  {path: 'login',component: LoginComponent},
  {path: 'detay/:key',component: DerslerdetayComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
