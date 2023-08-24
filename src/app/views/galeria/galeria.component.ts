import { Component, Type } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { VillanosService } from '../../services/villanos.service';
import { SuperheroesService } from '../../services/superheroes.service';
import { NavbarComponent } from 'src/app/views/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/views/shared/footer/footer.component';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent {

  //! Nav-Footer
  navbarComponent: Type<NavbarComponent> = NavbarComponent;
  footerComponent: Type<FooterComponent> = FooterComponent;

  dataEve:any[] = [];
  dataVill:any[] = [];
  dataSH:any[] = [];

  constructor(public eventosservice:EventosService, public villanosservice:VillanosService, public superheroesservice:SuperheroesService) {
    this.eventos();
    this.villanos();
    this.superheroes();
  }

  eventos() {
    this.eventosservice.eventos().subscribe((rerp:any) => {
      this.dataEve = rerp;
    })
  }
  
  villanos() {
    this.villanosservice.villanos().subscribe((rerp:any) => {
      this.dataVill = rerp;
    })
  }
  
  superheroes() {
    this.superheroesservice.superheroes().subscribe((rerp:any) => {
      this.dataSH = rerp;
    })
  }
}
