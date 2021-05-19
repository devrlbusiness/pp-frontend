import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { UsuarioI } from '../../interfaces/usuario.interface';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  public usuario: UsuarioI;
  constructor(
    private router: Router,
    private securitySvc: SecurityService
  ) { }

  canActivate() {
    this.usuario = jwt_decode(this.securitySvc.getToken());
    const current_time = Date.now() / 1000;
    if (this.usuario.exp < current_time) {
      this.securitySvc.logOff();
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
