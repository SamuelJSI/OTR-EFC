import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

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
    private snackBar: MatSnackBar,
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
      this.loggedInUser = (
        await this.authenticationService.getUserDetail()
      ).name;
      // this.router.navigate(['/dashboard']);
    }
  }

  public login() {
    if (this.authenticationForm.valid) {
      const credential = this.authenticationForm.value;
      this.authenticationService
        .signIn(credential.userName, credential.password)
        .then(
          () => {
            this.isAuthenticated = true;
            this.authenticationService.getUserDetail().then((userDetail) => {
              this.loggedInUser = userDetail.name;
            });
            this.router.navigate(['/dashboard']);
          },
          (reason) => {
            this.snackBar.open(reason.errorSummary, '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000
            });
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
