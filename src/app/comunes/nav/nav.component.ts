import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged = false;
  verMensaje = false;
  mensaje = '';
  nombre = '';
  tipoMensaje: '';
  subscripLogin: Subscription;
  subscripMensaje: Subscription;
  @ViewChild('burger', {static: false}) burgerRef: ElementRef;
  @ViewChild('menu', {static: false}) menuRef: ElementRef;
  showOverlay = false;

  constructor(private estadoService: EstadoService) { 
    this.subscripLogin = this.estadoService.isLoggedIn
    .subscribe(
      (data: any) => {
        this.isLogged = data.logged;
      },
      (error:any) => {console.log(error)
    })
    this.subscripMensaje = this.estadoService.setMensaje
    .subscribe(
      (data: any) => {
        this.verMensaje = true;
        this.mensaje = data.mensaje;
        this.tipoMensaje = data.tipo;
        this.nombre = data.extra;
        setTimeout(() => {this.verMensaje = false},3000);
      },
      (error:any) => {console.log(error)}
    )
  }

  ngOnInit() {
    // this.nombre = JSON.parse(localStorage.getItem('usuario')).nombre;
  }

  toggleMenu() {
    this.burgerRef.nativeElement.classList.toggle('open-menu');
    this.menuRef.nativeElement.classList.toggle('open-menu');
  }

  toggleOverlay(sidemenu?) {
    this.showOverlay = !this.showOverlay;
    if(sidemenu) {
      this.burgerRef.nativeElement.classList.toggle('open-menu');
      this.menuRef.nativeElement.classList.toggle('open-menu');
    }
  }

  exit() {
    this.estadoService.logout();
  }

}
