import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedProfileService {
  private sharedProfilesSubject = new BehaviorSubject<any[]>([]);
  sharedProfiles$ = this.sharedProfilesSubject.asObservable();

  constructor() { }

  updateSharedProfiles(profiles: any[]) {
    this.sharedProfilesSubject.next(profiles);
  }
}
