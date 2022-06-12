import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';


const routes: Routes = [
  {path: 'form', component: formComponent},
  {path: 'list', component: ListComponent},
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
