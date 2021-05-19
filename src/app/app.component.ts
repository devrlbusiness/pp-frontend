import { Component } from '@angular/core';

import { SecurityService } from 'src/app/services/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public IsAuthenticated = false;
  private subsAuth$: Subscription;

  constructor(private securitySvc: SecurityService) {
    this.IsAuthenticated = this.securitySvc.IsAuthorized;

    this.subsAuth$ = this.securitySvc.authChallenge$.subscribe(
                        (isAuth) => {
                          this.IsAuthenticated = isAuth;
                        });                        
  }

  ngOnDestroy() {
    if (this.subsAuth$) {
      this.subsAuth$.unsubscribe();
    }
  }
}
