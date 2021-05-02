import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { AUTH_CONFIG, CLIENT_ID } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private oktaAuthClient: OktaAuth;
  private user: any;

  constructor(private router: Router) {
    this.oktaAuthClient = new OktaAuth(AUTH_CONFIG);
  }

  public get session() {
    return this.oktaAuthClient.session;
  }

  public async isAuthenticated() {
    return await this.oktaAuthClient.isAuthenticated();
  }

  public signIn(username: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.oktaAuthClient
        .signInWithCredentials({
          username,
          password,
        })
        .then(
          (response) => {
            if (response.status === 'SUCCESS') {
              this.oktaAuthClient.token
                .getWithoutPrompt({
                  clientId: CLIENT_ID,
                  responseType: ['id_token', 'token'],
                  scopes: ['openid', 'profile', 'email', 'offline_access'],
                  sessionToken: response.sessionToken,
                  redirectUri: window.location.origin,
                })
                .then(async (tokens) => {
                  this.oktaAuthClient.tokenManager.setTokens(tokens.tokens);
                  this.user = this.oktaAuthClient.getUser();
                  resolve();
                });
            } else {
              reject(response);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
    });
  }

  public signOut() {
    this.router.navigate(['/']);
    this.oktaAuthClient.signOut();
  }

  public async getUserDetail() {
    return this.user ? this.user : this.oktaAuthClient.getUser();
  }
}
