import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  urlLogin = environment.urlLogin;

  usuario = {
    objectId: '',
    nombre: '',
    rol: ''
  }

  private loggedIn = new BehaviorSubject<any>({logged: false});
  private mensajeIn = new BehaviorSubject<any>({mensaje: ''});

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get setMensaje() {
    return this.mensajeIn.asObservable();
  }

  constructor(public http: HttpClient,
              public route: ActivatedRoute, 
              public router: Router) { 
                this.cargarCredenciales();
              }

  login(usuario) {
    return this.http.post(this.urlLogin, usuario).pipe(
      map( (res: any) => {
        this.guardarCredenciales(res);
        // this.welcome.next(res.nombre);
        // setTimeout(() => {
        //   this.welcome.next('');
        // }, 3000)
        return res;
      })
    );
  }

  guardarCredenciales(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.loggedIn.next({logged: true});
    this.mensajeIn.next({mensaje: `Bienvenid@ de nuevo ${this.usuario.nombre}`});
  }

  cargarCredenciales() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loggedIn.next({logged: true});
      this.mensajeIn.next({mensaje: `Bienvenid@ de nuevo ${this.usuario.nombre}`});
    } else {
      this.usuario = {
        objectId: '',
        nombre: '',
        rol: ''
      };
      this.loggedIn.next({logged: false});
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = {
      objectId: '',
      nombre: '',
      rol: ''
    }
    this.loggedIn.next({logged: false});
    this.router.navigate(['/']);
  }

}
