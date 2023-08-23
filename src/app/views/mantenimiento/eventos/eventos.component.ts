import { Component, Type } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
})
export class EventosComponent {

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
    Lugar:[,[Validators.required]],
    Impacto:[,[Validators.required]],
    Fecha:[,[Validators.required]],
    Descripción:[,[Validators.required]],
    Imagen:[,[Validators.required]],
  })

  //TODO Validar Editar
  formularioEditar:FormGroup = this.fb.group({
    Nombre:[,[Validators.required]],
    Lugar:[,[Validators.required]],
    Impacto:[,[Validators.required]],
    Fecha:[,[Validators.required]],
    Descripción:[,[Validators.required]],
    Imagen:[,[Validators.required]],
  })

  constructor(public eventosservice:EventosService, private fb:FormBuilder) {
    this.eventos();
  }

  eventos() {
    this.eventosservice.eventos().subscribe((rerp:any) => {
      this.data = rerp;
      console.log(this.data);
    })
  }

  registrarEvento() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return
    }
    this.eventosservice.registrarEvento(this.formulario.value).subscribe(resp => {
      console.log("El evento se registro de forma exitosa!");
      this.eventos();
      this.formulario.reset();
    })
  }

  seleccionarEvento(id:any) {
    this.eventosservice.seleccionEvento(id).subscribe((resp:any) => {
      this.info = resp;
      console.log(this.info);
      this.id = id;
      console.log(this.id);
    })
  }

  editarEvento(id:any) {
    if (!this.formularioEditar.valid) {
      this.formularioEditar.markAllAsTouched();
      return
    }
    const evento:any = {
      id:id,
      Nombre:this.formularioEditar.value.Nombre,
      Lugar:this.formularioEditar.value.Lugar,
      Impacto:this.formularioEditar.value.Impacto,
      Fecha:this.formularioEditar.value.Fecha,
      Descripción:this.formularioEditar.value.Descripción,
      Imagen:this.formularioEditar.value.Imagen,
    }
    this.eventosservice.editarEvento(evento).subscribe(resp => {
      this.eventos();
    })
  }

  eliminarEvento(id:any, z:number) {
    this.data.splice(z,1);
    this.eventosservice.eliminarEvento(id).subscribe(resp => console.log('El evento se elimino de forma correcta!'));
  }
}
