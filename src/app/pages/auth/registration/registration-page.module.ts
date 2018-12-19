import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { SharedMaterialModule } from 'src/app/shared-material/shared-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    RouterModule
  ],
  declarations: [RegistrationPageComponent],
  exports:[RegistrationPageComponent]
})
export class RegistrationPageModule { }
