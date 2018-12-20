import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { SharedMaterialModule } from 'src/app/shared-material/shared-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedValidatorsModule } from 'src/app/shared/shared-validators/shared-validators.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SharedMaterialModule,
    SharedValidatorsModule,
    RouterModule
  ],
  declarations: [RegistrationPageComponent],
  exports:[RegistrationPageComponent]
})
export class RegistrationPageModule { }
