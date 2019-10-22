import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { environment } from 'src/environments/environment';

declare var window: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  id: string;
  unidades: any;
  urlUnidades = environment.urlUnidades;

  myWindow: any;
  alumno = {
    learner_id: "123",
    learner_name: "Bob The Builder",
    suspend_data: ['1','1','0'],
    location: 0,
    entry: "resume"
  };

  constructor(private route: ActivatedRoute,
              private cursosService: CursosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.cursosService.getCurso(this.id)
              .subscribe((res: any)=> {
                this.unidades = res.curso.unidades;
              }, (error: any)=> {
                console.log(error);
              })

  }
  loadScorm(index) {
    window.API_1484_11.loadFromJSON(this.alumno);
    this.myWindow = window.open(this.urlUnidades + this.id + index + "/publicacion/index.html", "myWindow", "width=1240,height=720");
    this.myWindow.addEventListener("beforeunload",() => {
        this.alumno.location = window.API_1484_11.cmi.location;
        window.API_1484_11 = new window.simplifyScorm.ScormAPI2004();
    })
  }

}
