import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { SuperheroesComponent } from './views/mantenimiento/superheroes/superheroes.component';
import { VillanosComponent } from './views/mantenimiento/villanos/villanos.component';
import { UsuariosComponent } from './views/mantenimiento/usuarios/usuarios.component';
import { EventosComponent } from './views/mantenimiento/eventos/eventos.component';

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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
