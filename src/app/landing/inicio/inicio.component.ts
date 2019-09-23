import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  isLogged = false;
  subscripLogin: Subscription;

  constructor(private estadoService: EstadoService,
              private router: Router) { 
                this.subscripLogin = this.estadoService.isLoggedIn
                                              .subscribe(
                                                (data: any) => {
                                                  this.isLogged = data.logged;
                                                },
                                                (error:any) => {console.log(error)
                                              })
              }

  ngOnInit() {
  }

}
