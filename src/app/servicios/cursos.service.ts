import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  urlCurso = environment.urlCurso;

  getCursos() {
    return this.http.get(this.urlCurso).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getCurso(id) {
    return this.http.get(this.urlCurso + `/${id}`)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  postCurso(curso) {
    const url = this.urlCurso;
    return this.http.post(url, curso).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putCurso(id, curso) {
    return this.http.put(this.urlCurso + `/${id}`, curso)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

}
