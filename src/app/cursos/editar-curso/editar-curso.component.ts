import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit {

  id: any;
  regForm: FormGroup;
  curso: any;
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:443/imagenes'});
  imagen: string;
  imageSrc: any;

  constructor(private fr: FormBuilder,
              private cursosService: CursosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.cursosService.getCurso(this.id)
    .subscribe( (res: any) => {
        this.curso = res.curso;
        this.imageSrc = 'http://localhost:443/imagenes/' + this.curso.imagen;
        this.regForm.get('codigo').setValue(this.curso.codigo);
        this.regForm.get('titulo').setValue(this.curso.titulo);
      }, (error: any) => {
        console.log(error);
    });
    this.regForm = this.fr.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required]
    });
  }

  submitReg() {
    const curso = {
      codigo: this.regForm.get('codigo').value,
      titulo: this.regForm.get('titulo').value,
      imagen: this.imagen
    };
    this.cursosService.putCurso(this.id, curso)
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
