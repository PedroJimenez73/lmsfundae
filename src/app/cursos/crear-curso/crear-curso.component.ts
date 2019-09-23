import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss']
})
export class CrearCursoComponent implements OnInit {

  @ViewChild('codigo', {static: false}) codigoRef: ElementRef;
  regForm: FormGroup;
  curso: any;
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:443/imagenes'});
  imagen: string;
  imageSrc: any;

  constructor(private fr: FormBuilder,
              private cursosService: CursosService,
              private router: Router) { }

  ngOnInit() {
    this.imageSrc = 'assets/img-dummie360x202.svg';
    this.regForm = this.fr.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required]
    });
    setTimeout(() => {
      this.codigoRef.nativeElement.focus();
    },500);
  }

  submitReg() {
    const curso = {
      codigo: this.regForm.get('codigo').value,
      titulo: this.regForm.get('titulo').value,
      imagen: this.imagen
    };
    this.cursosService.postCurso(curso)
      .subscribe( (res: any) => {
        this.router.navigate(['/cursos']);
      }, (error: any) => {
        console.log(error); 
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

}
