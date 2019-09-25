import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/servicios/estado.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  @ViewChild('nombre', {static: false}) nombreRef: ElementRef;
  regForm: FormGroup;
  usuario: any;
  waiting: boolean;
  roles = ['admin','alumno','autor','inspector','tutor'];
  rolesSel = [];

  constructor(private fr: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private estadoService: EstadoService) { }

  ngOnInit() {
    this.regForm = this.fr.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      checkPassword: ['', Validators.required],
      roles: ['texto'],
    });
    setTimeout(() => {
      this.nombreRef.nativeElement.focus();
    },500);
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
    const curso = {
      nombre: this.regForm.get('nombre').value,
      apellidos: this.regForm.get('apellidos').value,
      dni: this.regForm.get('dni').value,
      email: this.regForm.get('email').value,
      password: this.regForm.get('password').value,
      roles: this.rolesSel 
    };
    this.waiting = true;
    this.usuariosService.postUsuario(curso)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/listado-usuarios']);
        this.estadoService.newMessage('El usuario se ha creado correctamente', 'success');
      }, (error: any) => {
        this.waiting = false;
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

  deleteRolSel(i) {
    const rolAdd = this.rolesSel[i];
    this.roles.push(rolAdd);
    this.roles.sort();
    this.rolesSel.splice(i, 1);
  }

}
