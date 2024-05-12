import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedProfileService } from 'src/app/services/shared-profile.service';
import { KnowMeService } from 'src/app/services/know-me.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sharedProfiles: any[] = [];
  currentEmail: string = '';
  displayedColumns: string[] = ['srNo', 'name', 'phone', 'email', 'address', 'actions'];


  constructor(private authService: AuthService, private http: HttpClient, private router: Router,private sharedProfileService: SharedProfileService, private knowme: KnowMeService) { }

  ngOnInit(): void {
    this.sharedProfileService.sharedProfiles$.subscribe(profiles => {
      this.sharedProfiles = profiles;
    });
    this.currentEmail = this.authService.getEmail();
    this.getSharedProfiles();
  }

  getSharedProfiles() {
    this.http.get<any[]>('http://localhost:8000/api/getSharedProfiles?email=' + this.currentEmail).subscribe(
      (data) => {
        this.sharedProfiles = data;
      },
      (error) => {
        console.error('Error fetching shared profiles:', error);
        // Handle error appropriately
      }
    );
  }
  logout() {
    // Perform any logout operations if needed
    this.router.navigate(['']); // Redirect to the root path ('')
    this.authService.clearUserData();
    this.knowme.clearCompanyDetails();
  }
}
