import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { CLIENT_ID, ISSUER } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isAuthenticated: boolean;
  public loggedInUser: any;
  public authenticationForm!: FormGroup;
  public revealPassword: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.revealPassword = false;
    this.authenticationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    // Subscribe to authentication state changes
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authenticationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.loggedInUser = (await this.authenticationService.getUserDetail()).name;
      this.router.navigate(['/dashboard']);
    }
  }

  public login() {
    if (this.authenticationForm.valid) {
      const credential = this.authenticationForm.value;
      this.authenticationService
        .signIn(credential.userName, credential.password)
        .then(
          async () => {
            this.isAuthenticated = true;
            this.loggedInUser = (await this.authenticationService.getUserDetail()).name;
            this.router.navigate(['/dashboard']);
          },
          () => {
            this.isAuthenticated = false;
          }
        );
    }
  }

  async logOutProfile() {
    this.authenticationService.signOut();
  }

  toggleRevealPassword() {
    this.revealPassword = !this.revealPassword;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.authenticationForm?.get(controlName)?.hasError(errorName);
  };

  toggleSideNavbar(sideNav: MatSidenav) {
    if (sideNav && sideNav.toggle) {
      sideNav.toggle();
    }
  }
}
