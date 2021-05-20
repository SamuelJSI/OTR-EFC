import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { AUTH_CONFIG, CLIENT_ID, SCOPES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private oktaAuthClient: OktaAuth;
  private user: any;
  private totalNoOfTimesRenewed: number;

  constructor(private router: Router) {
    this.totalNoOfTimesRenewed = 0;
    this.oktaAuthClient = new OktaAuth(AUTH_CONFIG);
    this.oktaAuthClient.tokenManager.on('expired', (key, expiredToken) => {
      console.log('Token with key', key, ' has expired:');
      console.log(expiredToken);
    });
    this.oktaAuthClient.tokenManager.on(
      'renewed',
      (key, newToken: any, oldToken) => {
        console.log('Token with key', key, 'has been renewed');
        console.log('Old token:', oldToken);
        console.log('New token:', newToken);

        this.totalNoOfTimesRenewed++;
        if (this.totalNoOfTimesRenewed > 2) {
          console.log('Token Revoked...');          
          this.oktaAuthClient.revokeRefreshToken();
        }
      }
    );
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
                  scopes: SCOPES,
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

  public async isTokenExpired() {
    const tokens = await this.oktaAuthClient.tokenManager.getTokens();
    if(tokens && tokens.accessToken) {
      return this.oktaAuthClient.tokenManager.hasExpired(tokens.accessToken);
    }
    return true;
  }

  public async getUserDetail() {
    return this.user ? this.user : await this.oktaAuthClient.getUser();
  }
}
