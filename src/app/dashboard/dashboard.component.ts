import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public user: string;

  constructor(public authenticationService: AuthenticationService) {}

  async ngOnInit() {
    this.user = (await this.authenticationService.getUserDetail()).name;
  }
}
