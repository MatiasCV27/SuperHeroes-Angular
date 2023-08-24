import { Component, Type } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
  formulario: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.minLength(3)]],
    Lugar: ['', [Validators.required, Validators.minLength(3)]],
    Impacto: ['', [Validators.required, Validators.minLength(3)]],
    Fecha: ['', [Validators.required, Validators.minLength(3)]],
    Descripcion: ['', [Validators.required, Validators.minLength(3)]],
    Imagen: ['', [Validators.required, Validators.minLength(3)]],
  });

  //TODO Validar Editar
  formularioEditar:FormGroup = this.fb.group({
    Nombre:[,[Validators.required]],
    Lugar:[,[Validators.required]],
    Impacto:[,[Validators.required]],
    Fecha:[,[Validators.required]],
    Descripcion:[,[Validators.required]],
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
      let errorMessage = 'Por favor completa todos los campos antes de registrar el evento.';
      if (this.formulario.controls['Nombre'].invalid && this.formulario.controls['Nombre'].errors?.['minlength']) {
        errorMessage = `El campo nombre debe tener al menos ${this.formulario.controls['Nombre'].errors['minlength'].requiredLength} caracteres.`;
      } else if (this.formulario.controls['Lugar'].invalid && this.formulario.controls['Lugar'].errors?.['minlength']) {
        errorMessage = `El campo lugar debe tener al menos ${this.formulario.controls['Lugar'].errors['minlength'].requiredLength} caracteres.`;
      } else if (this.formulario.controls['Impacto'].invalid && this.formulario.controls['Impacto'].errors?.['minlength']) {
        errorMessage = `El campo impacto debe tener al menos ${this.formulario.controls['Impacto'].errors['minlength'].requiredLength} caracteres.`;
      } else if (this.formulario.controls['Fecha'].invalid && this.formulario.controls['Fecha'].errors?.['minlength']) {
        errorMessage = `El campo fecha debe tener al menos ${this.formulario.controls['Fecha'].errors['minlength'].requiredLength} caracteres.`;
      } else if (this.formulario.controls['Descripcion'].invalid && this.formulario.controls['Descripcion'].errors?.['minlength']) {
        errorMessage = `El campo descripción debe tener al menos ${this.formulario.controls['Descripcion'].errors['minlength'].requiredLength} caracteres.`;
      } else if (this.formulario.controls['Imagen'].invalid && this.formulario.controls['Imagen'].errors?.['minlength']) {
        errorMessage = `El campo imagen debe tener al menos ${this.formulario.controls['Imagen'].errors['minlength'].requiredLength} caracteres.`;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        background: '#212529',
        color: 'white' 
      });
      return
    }
    this.eventosservice.registrarEvento(this.formulario.value).subscribe(
      () => {
        this.eventos();
        this.formulario.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'El evento se registró correctamente.',
          timer: 2000,
          background: '#212529',
          color: 'white'
        });
      },
    );
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
      Descripcion:this.formularioEditar.value.Descripcion,
      Imagen:this.formularioEditar.value.Imagen,
    }
    this.eventosservice.editarEvento(evento).subscribe(
      () => {
        this.eventos();
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

  eliminarEvento(id: any, z: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este evento?',
      icon: 'question',
      text: 'No se podrá revertir la eliminación del evento',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#212529',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.splice(z, 1);
        this.eventosservice.eliminarEvento(id).subscribe(resp => {
        Swal.fire({
          title: 'Eliminado',
          text: 'El evento ha sido eliminado correctamente.',
          icon: 'success',
          background: '#212529', 
          color: 'white'
        });
      });
      }
    });
  }
}
