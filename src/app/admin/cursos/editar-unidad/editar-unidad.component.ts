import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-editar-unidad',
  templateUrl: './editar-unidad.component.html',
  styleUrls: ['./editar-unidad.component.scss']
})
export class EditarUnidadComponent implements OnInit {

  id: any;
  index: any;
  unidad: any;
  imagen: string;
  imageSrc: any;
  urlUnidades = environment.urlUnidades;
  public uploader:FileUploader = new FileUploader({url: this.urlUnidades});
  archivo: any;
  itemsForm: FormGroup;
  waiting = false;
  showOverlay = false;

  constructor(private fr: FormBuilder,
              private cursosService: CursosService,
              private router: Router,
              private route: ActivatedRoute,
              private estadoService: EstadoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.index = this.route.snapshot.params.i;
    this.itemsForm = this.fr.group({
      titulo: ['', Validators.required],
      duracion: ['', Validators.required]
    });
    this.cursosService.getCurso(this.id)
          .subscribe( (res: any) => {
              this.unidad = res.curso.unidades[this.index];
              this.itemsForm.get('titulo').setValue(this.unidad.titulo);
              this.itemsForm.get('duracion').setValue(this.unidad.duracion);
            }, (error: any) => {
              console.log(error);
          });

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('nombre', this.id + this.index);
    };

  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
        this.archivo = event.target.files[0].name;
      }
  }

  submitItem() {
    const unidad = {
      titulo: this.itemsForm.get('titulo').value,
      duracion: this.itemsForm.get('duracion').value,
    };
    this.waiting = true;
    this.cursosService.putUnidad(this.id, this.index, unidad)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/listado-cursos/editar-curso/' + this.id]);
        this.estadoService.newMessage('La unidad se ha modificado correctamente', 'success');
      }, (error: any) => {
        this.waiting = false;
        console.log(error); 
        this.scrollUp()
        this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
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

  deleteUnidad() {
    this.cursosService.deleteUnidad(this.id, this.index)
    .subscribe( (res: any) => {
      this.router.navigate(['/admin/listado-cursos/editar-curso/' + this.id]);
      this.estadoService.newMessage('La unidad se ha eliminado correctamente', 'success');
    }, (error: any) => {
      console.log(error); 
      this.scrollUp()
      this.estadoService.newMessage('Error de conexión, inténtelo más tarde', 'danger');
    });
  }

}
