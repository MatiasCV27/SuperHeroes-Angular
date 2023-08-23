import { Component, Type } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {

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
    Contraseña:[,[Validators.required]],
    Actividad:[,[Validators.required]],
    Roles:[,[Validators.required]],
  })

  //TODO Validar Editar
  formularioEditar:FormGroup = this.fb.group({
    Nombre:[,[Validators.required]],
    Contraseña:[,[Validators.required]],
    Actividad:[,[Validators.required]],
    Roles:[,[Validators.required]],
  })

  constructor(public usuariosservice:UsuariosService, private fb:FormBuilder) {
    this.Usuarios();
  }

  Usuarios() {
    this.usuariosservice.usuarios().subscribe((rerp:any) => {
      this.data = rerp;
      console.log(this.data);
    })
  }

  registrarUsuario() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return
    }
    this.usuariosservice.registrarUsuario(this.formulario.value).subscribe(resp => {
      console.log("El usuario se registro de forma exitosa!");
      this.Usuarios();
      this.formulario.reset();
    })
  }

  seleccionarUsuario(id:any) {
    this.usuariosservice.seleccionUsuario(id).subscribe((resp:any) => {
      this.info = resp;
      console.log(this.info);
      this.id = id;
      console.log(this.id);
    })
  }

  editarUsuario(id:any) {
    if (!this.formularioEditar.valid) {
      this.formularioEditar.markAllAsTouched();
      return
    }
    const usuario:any = {
      id:id,
      Nombre:this.formularioEditar.value.Nombre,
      Contraseña:this.formularioEditar.value.Contraseña,
      Actividad:this.formularioEditar.value.Actividad,
      Roles:this.formularioEditar.value.Roles,
    }
    this.usuariosservice.editarUsuario(usuario).subscribe(resp => {
      this.Usuarios();
    })
  }

  eliminarUsuario(id:any, z:number) {
    this.data.splice(z,1);
    this.usuariosservice.eliminarUsuario(id).subscribe(resp => console.log('El usuario se elimino de forma correcta!'));
  }
}
