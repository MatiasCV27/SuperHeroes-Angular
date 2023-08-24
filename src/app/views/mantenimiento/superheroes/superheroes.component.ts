import { Component, Type } from '@angular/core';
import { SuperheroesService } from '../../../services/superheroes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
    this.superheroesservice.registrarSuperHeroe(this.formulario.value).subscribe(
      () => {
        this.superheroes();
        this.formulario.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'El superheroe se registró correctamente.',
          timer: 2000,
          background: '#212529',
          color: 'white'
        });
      },
    );
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
    this.superheroesservice.editarSuperHeroe(superheroes).subscribe(
      () => {
        this.superheroes();
        Swal.fire({
          icon: 'success',
          title: 'Edición Exitosa',
          text: 'El evento se editó correctamente.',
          timer: 2000,
          background: '#212529',
          color: 'white' 
        });
      },
    );
  }

  eliminarSUperHeroe(id:any, z:number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este superheroe?',
      icon: 'question',
      text: 'No se podrá revertir la eliminación del superheroe',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#212529',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.splice(z, 1);
        this.superheroesservice.eliminarSuperHeroe(id).subscribe(resp => {
        Swal.fire({
          title: 'Eliminado',
          text: 'El superheroe ha sido eliminado correctamente.',
          icon: 'success',
          background: '#212529', 
          color: 'white'
        });
      });
      }
    });
  }
}