import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit{

  isAuthenticated: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  onClick() {
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch(error => console.log(error));
  }
}