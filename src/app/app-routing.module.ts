import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { InicioComponent } from './landing/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent, data: {titulo: 'Inicio'} },
  {path: 'admin', data: {titulo: 'Administración LMS'}, loadChildren: '../app/admin/admin.module#AdminModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
