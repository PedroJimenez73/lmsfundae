import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  // titulo: any;
  // rutas: any;
  // urls = [];
  // textosUrl = [];
  // currentUrl: string;


  constructor() { }

  ngOnInit() {

    // this.titulo = this.route.snapshot.data.titulo;
    // this.rutas = this.route.snapshot.pathFromRoot;
    // for (let i = 0; i < this.rutas.length; i ++) {
    //   if(this.rutas[i].data.breadcrumb) {
    //     this.textosUrl.push(this.rutas[i].data.titulo);
    //     this.urls.push(this.rutas[i].data.url);
    //   }
    // }
  }

}
