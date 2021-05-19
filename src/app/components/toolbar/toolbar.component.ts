import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { AppComponent } from 'src/app/app.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public usuario: UsuarioI;
  private isAuth: boolean;

  constructor(
    private router: Router,
    private securitySvc: SecurityService,
    private appComp: AppComponent
  ) {
    this.isAuth = this.appComp.IsAuthenticated;
    this.usuario = jwt_decode(this.securitySvc.getToken());
    this.isAuth = false;
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.securitySvc.logOff();
    this.router.navigate(['/']);
  }

}