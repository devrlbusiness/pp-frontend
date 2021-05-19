import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  IsAuthorized: any;

  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();

  constructor(private storeService: StorageService) {

    if (this.storeService.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storeService.retrieve('IsAuthorized');
      this.authSource.next(this.IsAuthorized);
    }
  }

  public getToken(): any {
    return this.storeService.retrieve('authData');
  }

  public resetAuthData() {
    this.storeService.store('authData', '');
    this.IsAuthorized = false;
    this.storeService.store('IsAuthorized', false);
  }

  public setAuthData(token: any) {  
    this.storeService.store('authData', token);
    this.IsAuthorized = true;
    this.storeService.store('IsAuthorized', true);
    this.authSource.next(true);
  }

  public logOff() {
    this.resetAuthData();
    this.authSource.next(false);
  }
}
