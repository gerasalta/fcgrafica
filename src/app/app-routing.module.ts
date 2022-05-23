import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formComponent } from './pages/form/form.component';


const routes: Routes = [
  {path: 'form', component: formComponent},
  {path: '**', redirectTo: 'form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
