import { Component, Type } from '@angular/core';

import { NavbarComponent } from './views/shared/navbar/navbar.component';
import { FooterComponent } from './views/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navbarComponent: Type<NavbarComponent> = NavbarComponent;
  footerComponent: Type<FooterComponent> = FooterComponent;
}
