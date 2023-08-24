import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { EventosComponent } from './views/mantenimiento/eventos/eventos.component';
import { SuperheroesComponent } from './views/mantenimiento/superheroes/superheroes.component';
import { VillanosComponent } from './views/mantenimiento/villanos/villanos.component';
import { GaleriaComponent } from './views/galeria/galeria.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'eventos', component: EventosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'superheroes', component: SuperheroesComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'villanos', component: VillanosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}