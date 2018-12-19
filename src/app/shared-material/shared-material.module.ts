import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule, MatProgressSpinnerModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class SharedMaterialModule { }
