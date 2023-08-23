import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { SuperheroesComponent } from './views/mantenimiento/superheroes/superheroes.component';
import { VillanosComponent } from './views/mantenimiento/villanos/villanos.component';
import { UsuariosComponent } from './views/mantenimiento/usuarios/usuarios.component';
import { EventosComponent } from './views/mantenimiento/eventos/eventos.component';

import { NavbarModule } from './views/shared/navbar/navbar.module'; // Asegúrate de importar el módulo

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactoComponent,
    SuperheroesComponent,
    VillanosComponent,
    UsuariosComponent,
    EventosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    NavbarModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}