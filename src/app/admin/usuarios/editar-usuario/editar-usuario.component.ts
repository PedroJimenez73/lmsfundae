import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  id: any;
  regForm: FormGroup;
  usuario: any;
  waiting = false;
  showOverlay = false;
  roles = ['admin','alumno','autor','inspector','tutor'];
  rolesSel = [];

  constructor(private fr: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private route: ActivatedRoute,
              private estadoService: EstadoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.usuariosService.getUsuario(this.id)
    .subscribe( (res: any) => {
        this.usuario = res.usuario;
        this.regForm.get('nombre').setValue(this.usuario.nombre);
        this.regForm.get('apellidos').setValue(this.usuario.apellidos);
        this.regForm.get('dni').setValue(this.usuario.dni);
        this.regForm.get('email').setValue(this.usuario.email);
        this.rolesSel = this.usuario.roles;
        this.rolesSel.forEach(rol=>{
          const index = this.roles.indexOf(rol);
          if (index !== -1) {
              this.roles.splice(index, 1);
              this.roles.sort();
          }
        })
      }, (error: any) => {
        console.log(error);
    });
    this.regForm = this.fr.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['texto']
    });
    this.onChanges();
  }

  onChanges() {
    this.regForm.valueChanges.subscribe(objetoForm => {
      const rol = objetoForm.roles;
      if(rol !== 'texto') {
        this.rolesSel.push(rol);
        const index = this.roles.indexOf(rol);
        if (index !== -1) {
            this.roles.splice(index, 1);
            this.roles.sort();
        }
        this.regForm.get('roles').setValue('texto');
      }
    })
  }

  submitReg() {
    const usuario = {
      nombre: this.regForm.get('nombre').value,
      apellidos: this.regForm.get('apellidos').value,
      dni: this.regForm.get('dni').value,
      email: this.regForm.get('email').value,
      roles: this.rolesSel 
    };
    this.waiting = true;
    this.usuariosService.putUsuario(this.id, usuario)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/listado-usuarios']);
        this.estadoService.newMessage('El usuario se ha modificado correctamente', 'success');
      }, (error: any) => {
        this.waiting = false;
        console.log(error); 
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

  deleteUsuario() {
    this.usuariosService.deleteUsuario(this.id)
      .subscribe( (res: any) => {
        this.router.navigate(['/admin/listado-usuarios']);
        this.estadoService.newMessage('El usuario se ha eliminado correctamente', 'success');
      }, (error: any) => {
        console.log(error); 
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

  scrollUp() {
      const scrollToTop = window.setInterval(() => {
          const pos = window.pageYOffset;
          if (pos > 0) {
              window.scrollTo(0, pos - 20); // how far to scroll on each step
          } else {
              window.clearInterval(scrollToTop);
          }
      }, 16);
  }

  toggleOverlay($event) {
    $event.preventDefault()
    this.showOverlay = !this.showOverlay;
  }

  deleteRolSel(i) {
    const rolAdd = this.rolesSel[i];
    this.roles.push(rolAdd);
    this.roles.sort();
    this.rolesSel.splice(i, 1);
  }

}
