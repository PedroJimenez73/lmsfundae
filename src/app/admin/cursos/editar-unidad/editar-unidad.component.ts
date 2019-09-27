import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private cursosService: CursosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.index = this.route.snapshot.params.i;
    this.cursosService.getCurso(this.id)
    .subscribe( (res: any) => {
        this.unidad = res.curso.unidades[this.index];
        console.log(this.unidad);
      }, (error: any) => {
        console.log(error);
    });
    // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    //       console.log(fileItem);
    //     };
    //     this.uploader.uploadAll();
    //     this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
    //   if(response){
    //     console.log("response"+JSON.stringify(response));
    //   }
    // }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('nombre', this.id + this.index);
    };

  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
        this.archivo = event.target.files[0].name;
      }
  }

}
