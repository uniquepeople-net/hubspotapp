import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: SocialUser | null = null;
  constructor() { }

  saveUser(user: SocialUser){
    this.user = user;
  }
}
