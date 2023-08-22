import { Component } from '@angular/core';
import { SuperheroesService } from './services/superheroes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EC4_SuperHeroes_MCV';
  data:any[] = [];

  formulario:FormGroup = this.fb.group({
    Nombre:[,[Validators.required]],
    Alias:[,[Validators.required]],
    Edad:[,[Validators.required]],
    Genero:[,[Validators.required]],
    Nacionalidad:[,[Validators.required]],
    Debilidad:[,[Validators.required]],
    Equipo:[,[Validators.required]],
    Imagen:[,[Validators.required]],
  })

  constructor(public superheroesservice:SuperheroesService, private fb:FormBuilder) {
    this.superheroes();
  }

  superheroes() {
    this.superheroesservice.superheroes().subscribe((rerp:any) => {
      this.data = rerp;
      console.log(this.data);
    })
  }

  registrarSuperHeroe() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return
    }
    this.superheroesservice.registrarSuperHeroe(this.formulario.value).subscribe(resp => {
      console.log("El superheroe se registro de forma exitosa!");
      this.superheroes();
      this.formulario.reset();
    })
  }
}
