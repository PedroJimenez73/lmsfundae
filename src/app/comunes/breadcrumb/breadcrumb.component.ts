import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  // titulo: any;
  rutas = [];
  urls = [];
  breadcrumbs = [];
  // textosUrl = [];
  // currentUrl: string;


  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.rutas = [];
        this.urls = [];
        this.breadcrumbs = [];
        if(event.url !== '/') {
          this.rutas = event.url.split("/");
          if(this.rutas.length < 4) {
            for (let i = 0; i < this.rutas.length; i ++) {
              this.urls[i] = [];
            }
            for (let i = 0; i < this.rutas.length; i ++) {
              for (let j = 0; j < (i+1); j++) {
                this.urls[i].push(this.rutas[j]);
              }
            }
            for (let i = 0; i < this.urls.length; i ++) {
              this.urls[i] = this.urls[i].join('/');;
            }
            for (let i = 0; i < this.urls.length; i ++) {
              this.breadcrumbs.push({ruta: this.rutas[i], url: this.urls[i]});
            }
          } else {
            for (let i = 0; i < 4; i ++) {
              this.urls[i] = [];
            }
            for (let i = 0; i < 4; i ++) {
              for (let j = 0; j < (i+1); j++) {
                this.urls[i].push(this.rutas[j]);
              }
            }
            for (let i = 0; i < this.urls.length; i ++) {
              this.urls[i] = this.urls[i].join('/');;
            }
            for (let i = 0; i < this.urls.length; i ++) {
              this.breadcrumbs.push({ruta: this.rutas[i], url: this.urls[i]});
            }
          }
        } else {
          this.breadcrumbs = [{ruta: '', url: ''}]
        }
      }
    });
  }

  ngOnInit() {
    
  }

}
