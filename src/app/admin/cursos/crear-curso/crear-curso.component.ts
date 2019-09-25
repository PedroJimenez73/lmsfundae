import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { CursosService } from 'src/app/servicios/cursos.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss']
})
export class CrearCursoComponent implements OnInit {


  @ViewChild('codigo', {static: false}) codigoRef: ElementRef;
  regForm: FormGroup;
  curso: any;
  urlImagenes = environment.urlImagenes;
  public uploader:FileUploader = new FileUploader({url: this.urlImagenes});
  imagen: string;
  imageSrc: any;
  waiting: boolean;
  autores: Array<object> = [];
  fechaActual = new Date();

  constructor(private fr: FormBuilder,
              private usuariosService: UsuariosService,
              private cursosService: CursosService,
              private router: Router,
              private estadoService: EstadoService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios()
      .subscribe((res: any)=>{
        const usuarios = res.usuarios;
        usuarios.forEach(usuario => {
          if(usuario.roles.includes('autor')){
            this.autores.push(usuario);
          }
        });
        console.log(this.autores);
      },
        (error) => { console.log(error)}
      )
    this.imageSrc = 'assets/img-dummie360x202.svg';
    this.regForm = this.fr.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required],
      horas: ['', Validators.required],
      fechaInicio: [null],
      fechaFin: [null],
      autor: ['', Validators.required]
    });
    setTimeout(() => {
      this.codigoRef.nativeElement.focus();
    },500);
  }

  submitReg() {
    const curso = {
      codigo: this.regForm.get('codigo').value,
      titulo: this.regForm.get('titulo').value,
      imagen: this.imagen,
      horas: this.regForm.get('horas').value,
      fechaInicio: this.regForm.get('fechaInicio').value,
      fechaFin: this.regForm.get('fechaFin').value,
      autor: this.regForm.get('autor').value,
    };
    this.waiting = true;
    this.cursosService.postCurso(curso)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/listado-cursos']);
        this.estadoService.newMessage('El curso se ha creado correctamente', 'success');
      }, (error: any) => {
        this.waiting = false;
        console.log(error);
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
       this.imagen = event.target.files[0].name;
       const file = event.target.files[0];
       const reader = new FileReader();
       reader.onload = e => this.imageSrc = reader.result;
       reader.readAsDataURL(file);
     }
   }

  scrollUp() {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
