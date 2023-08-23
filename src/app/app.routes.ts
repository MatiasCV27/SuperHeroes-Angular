import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { EventosComponent } from './views/mantenimiento/eventos/eventos.component';
import { SuperheroesComponent } from './views/mantenimiento/superheroes/superheroes.component';
import { VillanosComponent } from './views/mantenimiento/villanos/villanos.component';
import { UsuariosComponent } from './views/mantenimiento/usuarios/usuarios.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'superheroes', component: SuperheroesComponent },
  { path: 'villanos', component: VillanosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}