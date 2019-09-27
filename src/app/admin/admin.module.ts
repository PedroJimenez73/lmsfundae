import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { ListadoCursosComponent } from './cursos/listado-cursos/listado-cursos.component';
import { CrearCursoComponent } from './cursos/crear-curso/crear-curso.component';
import { EditarCursoComponent } from './cursos/editar-curso/editar-curso.component';
import { ListadoUsuariosComponent } from './usuarios/listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EditarUnidadComponent } from './cursos/editar-unidad/editar-unidad.component';

const routes: Routes = [
  {path: '', data: {titulo: 'Administración LMS'}, component: InicioAdminComponent},
  {path: 'listado-cursos', data: {titulo: 'Cursos'}, component: ListadoCursosComponent},
  {path: 'listado-cursos/crear-curso', data: {titulo: 'Nuevo curso'}, component: CrearCursoComponent},
  {path: 'listado-cursos/editar-curso/:id', data: {titulo: 'Editar curso'}, component: EditarCursoComponent},
  // {path: 'listado-cursos/editar-curso/editar-unidad/:id/:index', data: {titulo: 'Editar unidad'}, component: EditarUnidadComponent},
  {path: 'listado-cursos/editar-curso/:id/editar-unidad/:i', data: {titulo: 'Editar unidad'}, component: EditarUnidadComponent},
  {path: 'listado-usuarios', data: {titulo: 'Usuarios'}, component: ListadoUsuariosComponent},
  {path: 'listado-usuarios/crear-usuario', data: {titulo: 'Nuevo usuario'}, component: CrearUsuarioComponent},
  {path: 'listado-usuarios/editar-usuario/:id', data: {titulo: 'Editar usuario'}, component: EditarUsuarioComponent},
];

@NgModule({
  declarations: [
    InicioAdminComponent, 
    ListadoCursosComponent, 
    CrearCursoComponent, 
    EditarCursoComponent, 
    ListadoUsuariosComponent, 
    CrearUsuarioComponent, 
    EditarUsuarioComponent, 
    EditarUnidadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FileUploadModule
  ]
})

export class AdminModule { }
