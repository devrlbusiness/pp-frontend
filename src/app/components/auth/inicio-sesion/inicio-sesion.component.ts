import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  private urlUsuarios = environment.appUrl + 'usuarios/';
  private subRef$: Subscription;
  public formLogin: any;
  public hide = true;
  public isLoading: boolean;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private securitySvc: SecurityService,
    private snackBar: MatSnackBar
    ) {
    this.securitySvc.logOff();
    // Formulario Inicio
    this.formLogin = this.fb.group({
      correo: ['', [
        Validators.required,
        Validators.email]
      ],
      contrasena: ['', Validators.required],
    });
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  onLogin(dataForm) {
    this.isLoading = true;
    // Validando formulario de Prospecto
    if (!this.formLogin.valid) return;
    // Obtendiendo datos de formulario
    const dataUsuario: UsuarioI = {
      correo: dataForm.correo,
      contrasena: dataForm.contrasena,
    }
    this.subRef$ = this.dataSvc.post<any>(this.urlUsuarios + 'login', dataUsuario)
      .subscribe(res => {
        this.isLoading = false;
        const token = res.body.token;
        this.securitySvc.setAuthData(token);
        this.route.navigate(['/inicio'])
      },
        err => {
          console.log('Error en el login', err);
          if(err.error.hasOwnProperty('message')){
            this.snackBar.open(err.error.message, '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['red-snackbar'], 
            });
          }else{
            this.snackBar.open('Ocurrió un error', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
          this.isLoading = false;
        });
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

  // Métodos de acceso formulario
  get correo() { return this.formLogin.get('correo'); }

  get contrasena() { return this.formLogin.get('contrasena'); }
}
