import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//* Rutas
//import { APP_ROUTING } from './app.routes';

//* Componentes
import { AppComponent } from './app.component';
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
    //APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
