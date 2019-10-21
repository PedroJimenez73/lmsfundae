import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioCursosComponent } from './inicio-cursos/inicio-cursos.component';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {path: '', data: {titulo: 'Cursos'}, component: InicioCursosComponent},
  {path: 'curso/:id', data: {titulo: 'Curso'}, component: CursoComponent},
];

@NgModule({
  declarations: [
    InicioCursosComponent,
    CursoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})

export class CursosModule { }
