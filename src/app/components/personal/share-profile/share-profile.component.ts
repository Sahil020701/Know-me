import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';
import { SharedProfileService } from 'src/app/services/shared-profile.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KnowMeService } from 'src/app/services/know-me.service';

@Component({
  selector: 'app-share-profile',
  templateUrl: './share-profile.component.html',
  styleUrls: ['./share-profile.component.scss']
})
export class ShareProfileComponent implements OnInit {
  companies: any[] = [];
  originalCompanies: any[] = []; // Store original list of companies
  displayedColumns: string[] = ['srNo', 'name', 'address', 'gstNumber', 'share'];
  userEmail: string = '';

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sharedProfileService: SharedProfileService,
    private router: Router,
    private knowme:KnowMeService
  ) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getEmail();
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.http.get<any[]>('http://localhost:8000/api/getAllcompanies').subscribe(
      (data) => {
        this.companies = data;
        this.originalCompanies = [...this.companies]; // Store original list

        this.applyFilter(''); // Apply initial filter
      },
      (error) => {
        console.error('Error fetching companies:', error);
        // Handle error appropriately
      }
    );
  }

  onClickShare(company: any) {
    const personalID = this.authService.getPersonalID();
    const companyID = company._id;

    this.http.post<any>('http://localhost:8000/api/shareProfile', { personalID, companyID }).subscribe(
      (response) => {
        console.log('Share successful:', response);
        alert(`Profile shared successfully with ${company.Cname}`);
        this.fetchSharedProfiles(); // Fetch updated shared profiles after sharing
      },
      (error) => {
        console.error('Error sharing profile:', error);
        // Handle error appropriately
      }
    );
  }

  fetchSharedProfiles() {
    this.http.get<any[]>('http://localhost:8000/api/getSharedProfiles?email=' + this.userEmail).subscribe(
      (data) => {
        this.sharedProfileService.updateSharedProfiles(data); // Update shared profiles in the service
      },
      (error) => {
        console.error('Error fetching shared profiles:', error);
        // Handle error appropriately
      }
    );
  }

  applyFilter(event: any) {
    const filterValue = event?.target?.value;
  const lowerCaseFilterValue = filterValue.trim().toLowerCase();
  if (lowerCaseFilterValue === '') {
    // If search input is empty, reset companies to original list
    this.companies = [...this.originalCompanies];
  } else {
    // Filter companies based on search input
    this.companies = this.originalCompanies.filter(company => company.Cname.toLowerCase().includes(lowerCaseFilterValue));
  }
}
logout() {
  // Perform any logout operations if needed
  this.router.navigate(['']); // Redirect to the root path ('')
  this.authService.clearUserData();
  this.knowme.clearCompanyDetails();
}
  
}


