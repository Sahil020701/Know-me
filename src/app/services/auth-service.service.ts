import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string = '';
  private personalID: number | null = null; // Assuming PersonalID is a number

  constructor() { }

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string {
    return this.userEmail;
  }

  setPersonalID(personalID: number): void {
    this.personalID = personalID;
  }

  getPersonalID(): number | null {
    return this.personalID;
  }

  clearUserData(): void {
    this.userEmail = '';
    this.personalID = null;
  }
}
