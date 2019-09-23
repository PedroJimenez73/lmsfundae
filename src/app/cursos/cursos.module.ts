import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { InicioCursosComponent } from './inicio-cursos/inicio-cursos.component';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';

const routes: Routes = [
  {path: '', data: {titulo: 'Cursos'}, component: InicioCursosComponent},
  {path: 'crear-curso', data: {titulo: 'Nuevo curso'}, component: CrearCursoComponent},
  {path: 'editar-curso/:id', data: {titulo: 'Editar curso'}, component: EditarCursoComponent},
];

@NgModule({
  declarations: [
    InicioCursosComponent,
    CrearCursoComponent,
    EditarCursoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class CursosModule { }
