import { Component, Type } from '@angular/core';
import { SuperheroesService } from '../../../services/superheroes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';
@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
})
export class SuperheroesComponent {

  //! Nav-Footer
  navbarComponent: Type<NavbarComponent> = NavbarComponent;
  footerComponent: Type<FooterComponent> = FooterComponent;

  //! Funcionalidad
  data:any[] = [];
  info:any = [];
  id:any;

  //TODO Validar Registro
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

  //TODO Validar Editar
  formularioEditar:FormGroup = this.fb.group({
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

  seleccionarSuperHeroe(id:any) {
    this.superheroesservice.seleccionSuperHeroe(id).subscribe((resp:any) => {
      this.info = resp;
      console.log(this.info);
      this.id = id;
      console.log(this.id);
    })
  }

  editarSuperHeroe(id:any) {
    if (!this.formularioEditar.valid) {
      this.formularioEditar.markAllAsTouched();
      return
    }
    const superheroes:any = {
      id:id,
      Nombre:this.formularioEditar.value.Nombre,
      Alias:this.formularioEditar.value.Alias,
      Edad:this.formularioEditar.value.Edad,
      Genero:this.formularioEditar.value.Genero,
      Nacionalidad:this.formularioEditar.value.Nacionalidad,
      Debilidad:this.formularioEditar.value.Debilidad,
      Equipo:this.formularioEditar.value.Equipo,
      Imagen:this.formularioEditar.value.Imagen,
    }
    this.superheroesservice.editarSuperHeroe(superheroes).subscribe(resp => {
      this.superheroes();
    })
  }

  eliminarSUperHeroe(id:any, z:number) {
    this.data.splice(z,1);
    this.superheroesservice.eliminarSuperHeroe(id).subscribe(resp => console.log('El superheroe se elimino de forma correcta!'));
  }
}
