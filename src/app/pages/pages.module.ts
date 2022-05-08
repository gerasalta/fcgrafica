import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { formComponent } from './form/form.component';



@NgModule({
  declarations: [
    formComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
  ],
  exports: [
    formComponent
  ]
})
export class PagesModule { }
