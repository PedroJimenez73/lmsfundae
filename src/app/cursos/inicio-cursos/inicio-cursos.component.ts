import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-inicio-cursos',
  templateUrl: './inicio-cursos.component.html',
  styleUrls: ['./inicio-cursos.component.scss']
})
export class InicioCursosComponent implements OnInit {

  cursos: {};

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.getCursos()
    .subscribe((res: any)=>{
      this.cursos = res.cursos;
      console.log(this.cursos)
    },
      (error) => { console.log(error)}
    )
  }

}
