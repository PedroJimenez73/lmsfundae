import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { CursosService } from 'src/app/servicios/cursos.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit {


  id: any;
  regForm: FormGroup;
  curso: any;
  urlImagenes = environment.urlImagenes;
  urlCurso = environment.urlCurso;
  public uploader:FileUploader = new FileUploader({url: this.urlImagenes});
  imagen: string;
  imageSrc: any;
  waiting = false;
  showOverlay = false;
  showOverlay2 = false;
  showOverlay3 = false;
  autores: Array<object> = [];
  fechaActual = new Date();
  unidadesPre: number;
  unidades = [];
  itemsForm: FormGroup;

  constructor(private fr: FormBuilder,
              private usuariosService: UsuariosService,
              private cursosService: CursosService,
              private router: Router,
              private route: ActivatedRoute,
              private estadoService: EstadoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.usuariosService.getUsuarios()
      .subscribe((res: any)=>{
        const usuarios = res.usuarios;
        usuarios.forEach(usuario => {
          if(usuario.roles.includes('autor')){
            this.autores.push(usuario);
          }
        });
      },
        (error) => { console.log(error)}
      )
    this.cursosService.getCurso(this.id)
    .subscribe( (res: any) => {
        this.curso = res.curso;
        const udesPre = res.curso.unidades.length;
        this.unidadesPre = udesPre
        this.imageSrc = this.urlImagenes + this.curso.imagen;
        this.unidades = this.curso.unidades;
        this.regForm.get('codigo').setValue(this.curso.codigo);
        this.regForm.get('titulo').setValue(this.curso.titulo);
        this.regForm.get('horas').setValue(this.curso.horas);
        this.regForm.get('fechaInicio').setValue(this.curso.fechaInicio);
        this.regForm.get('fechaFin').setValue(this.curso.fechaFin);
        this.regForm.get('autor').setValue(this.curso.autor);
      }, (error: any) => {
        console.log(error);
    });
    this.regForm = this.fr.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required],
      horas: ['', Validators.required],
      fechaInicio: [''],
      fechaFin: [''],
      autor: ['', Validators.required]
    });
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('nombre', this.regForm.get('codigo').value);
    };
    this.itemsForm = this.fr.group({
      titulo: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }

  editarUnidad(i) {
    console.log(this.unidades.length);
    console.log(this.unidadesPre);
    console.log(this.unidades.length > this.unidadesPre)
    if(this.unidades.length > this.unidadesPre) {
      this.showOverlay3 = !this.showOverlay3;
    } else {
      this.router.navigate(['/admin/listado-cursos/editar-curso/' + this.id + '/editar-unidad/' + i]);
    } 
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
      unidades: this.unidades
    };
    this.waiting = true;
    this.cursosService.putCurso(this.id, curso)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/listado-cursos']);
        this.estadoService.newMessage('El curso se ha modificado correctamente', 'success');
      }, (error: any) => {
        this.waiting = false;
        console.log(error); 
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

  submitItem() {
    this.showOverlay2 = !this.showOverlay2;
    this.unidades.push(this.itemsForm.value);
    this.itemsForm.reset();
  }

  deleteCurso() {
    this.cursosService.deleteCurso(this.id)
      .subscribe( (res: any) => {
        this.router.navigate(['/admin/listado-cursos']);
        this.estadoService.newMessage('El curso se ha eliminado correctamente', 'success');
      }, (error: any) => {
        console.log(error); 
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
        this.imagen = this.regForm.get('codigo').value + '.' + event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length -1];
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

  toggleOverlay($event) {
    $event.preventDefault()
    this.showOverlay = !this.showOverlay;
  }

  toggleOverlay2($event) {
    $event.preventDefault()
    this.showOverlay2 = !this.showOverlay2;
  }

  toggleOverlay3($event) {
    $event.preventDefault()
    this.showOverlay3 = !this.showOverlay3;
  }

}
