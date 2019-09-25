import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {

  cursos: {};

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.getCursos()
    .subscribe((res: any)=>{
      this.cursos = res.cursos;
    },
      (error) => { console.log(error)}
    )
  }

}
