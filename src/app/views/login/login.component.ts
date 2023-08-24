import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
  
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/home']);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión Exitoso',
          text: '¡Bienvenido de vuelta!',
          timer: 2000 ,
          background: '#212529',
          color: 'white'
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error en inicio de sesión',
          text: 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus credenciales.',
          background: '#212529',
          color: 'white'
        });
      });
  }

  navbarComponent: Type<NavbarComponent> = NavbarComponent;
  footerComponent: Type<FooterComponent> = FooterComponent;
}
