import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistrationPageComponent],
  exports:[RegistrationPageComponent]
})
export class RegistrationPageModule { }
