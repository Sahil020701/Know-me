import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { KnowMeService } from 'src/app/services/know-me.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent {
  constructor(private knowme: KnowMeService, private authService: AuthService, private http: HttpClient, private router: Router){}

  Pname: string = '';
  address: string = '';
  email: string = '';
  phone: string = '';

  ngOnInit(): void {
    // Retrieve the logged-in user's email address from AuthService
    const userEmail = this.authService.getEmail();
    console.log(userEmail);
    // Make an HTTP request to fetch company profile data associated with the logged-in user
    this.http.get<any>(`http://localhost:8000/api/personal/${userEmail}`).subscribe(
      response => {
        // Handle successful response
        this.authService.setPersonalID(response.PersonalID);
        console.log(response.PersonalID);
        this.Pname = response.Pname;
        this.address = response.address;
        this.email = response.email;
        this.phone = response.phone;
      },
      error => {
        // Handle error
        console.error('Error fetching company profile data:', error);
        // You might want to display an error message or handle the error in some way
      }
    );
  }
  onClickShare(){
    this.router.navigate(['/sharePersonalDetails'])
  }

}
