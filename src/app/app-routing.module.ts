import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './pages/auth/registration/registration-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';

const routes: Routes = [
  {path:'registration',component:RegistrationPageComponent},
  {path:'',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
