import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { formComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';


const routes: Routes = [
  {path: 'form', component: formComponent},
  {path: 'list', component: ListComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
