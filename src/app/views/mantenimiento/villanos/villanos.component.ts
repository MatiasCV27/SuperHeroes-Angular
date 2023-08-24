import { Component, Type } from '@angular/core';
import { VillanosService } from '../../../services/villanos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';
@Component({
  selector: 'app-villanos',
  templateUrl: './villanos.component.html',
})
export class VillanosComponent {

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

  constructor(public villanosservice:VillanosService, private fb:FormBuilder) {
    this.villanos();
  }

  villanos() {
    this.villanosservice.villanos().subscribe((rerp:any) => {
      this.data = rerp;
      console.log(this.data);
    })
  }

  registrarVillano() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return
    }
    this.villanosservice.registrarVillano(this.formulario.value).subscribe(
      () => {
        this.villanos();
        this.formulario.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'El villano se registró correctamente.',
          timer: 2000,
          background: '#212529',
          color: 'white'
        });
      },
    );
  }

  seleccionarVillano(id:any) {
    this.villanosservice.seleccionVillano(id).subscribe((resp:any) => {
      this.info = resp;
      console.log(this.info);
      this.id = id;
      console.log(this.id);
    })
  }

  editarVillano(id:any) {
    if (!this.formularioEditar.valid) {
      this.formularioEditar.markAllAsTouched();
      return
    }
    const villano:any = {
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
    this.villanosservice.editarVillano(villano).subscribe(
      () => {
        this.villanos();
        Swal.fire({
          icon: 'success',
          title: 'Edición Exitosa',
          text: 'El villano se editó correctamente.',
          timer: 2000,
          background: '#212529',
          color: 'white' 
        });
      },
    );
  }

  eliminarVillano(id:any, z:number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este villano?',
      icon: 'question',
      text: 'No se podrá revertir la eliminación del villano',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#212529',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.splice(z, 1);
        this.villanosservice.eliminarVillano(id).subscribe(resp => {
        Swal.fire({
          title: 'Eliminado',
          text: 'El villano ha sido eliminado correctamente.',
          icon: 'success',
          background: '#212529', 
          color: 'white'
        });
      });
      }
    });
  }
}