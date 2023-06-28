import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [

  {
    path:'', redirectTo: 'login', pathMatch:'full'
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'recoverPassword', component: RecoverPasswordComponent
  },
  {
    path:'home', component: HomeComponent
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
