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
import { EventosComponent } from './views/mantenimiento/eventos/eventos.component';

import { NavbarModule } from './views/shared/navbar/navbar.module';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { GaleriaComponent } from './views/galeria/galeria.component'; // Asegúrate de importar el módulo

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactoComponent,
    SuperheroesComponent,
    VillanosComponent,
    EventosComponent,
    LoginComponent,
    RegisterComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    NavbarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()) 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}