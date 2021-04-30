import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { AUTH_CONFIG, CLIENT_ID } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private oktaAuthClient: OktaAuth;

  constructor() {
    this.oktaAuthClient = new OktaAuth(AUTH_CONFIG);
  }

  public async isAuthenticated() {
    return await this.oktaAuthClient.isAuthenticated();
  }

  public signIn(username: string, password: string) {
    return new Promise<void>((resolve, reject)=>{
      this.oktaAuthClient
      .signInWithCredentials({
        username,
        password,
      })
      .then((response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthClient.token
            .getWithoutPrompt({
              clientId: CLIENT_ID,
              responseType: ['id_token', 'token'],
              scopes: ['openid', 'profile', 'email'],
              sessionToken: response.sessionToken,
              redirectUri: window.location.origin,
            })
            .then((tokens) => {
              this.oktaAuthClient.tokenManager.setTokens(tokens.tokens);
             resolve();
            });
        } else {
          reject(response);
        }
      }, (reason)=>{
        reject(reason);
      });
    });
  }

  public signOut() {
    this.oktaAuthClient.signOut();
    this.oktaAuthClient.tokenManager.clear();
  }

  public async getUserDetail() {
    return await this.oktaAuthClient.getUser();
  }
}
