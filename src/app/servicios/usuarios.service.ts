import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  urlUsuario = environment.urlUsuario;

  getUsuarios() {
    return this.http.get(this.urlUsuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getUsuario(id) {
    return this.http.get(this.urlUsuario + `/${id}`)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  postUsuario(usuario) {
    const url = this.urlUsuario;
    return this.http.post(url, usuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putUsuario(id, usuario) {
    return this.http.put(this.urlUsuario + `/${id}`, usuario)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  deleteUsuario(id) {
    return this.http.delete(this.urlUsuario + `/${id}`)
      .pipe(
        map( (res: any) => {
          return res;
        })
      );
  }
}
