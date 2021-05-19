import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { SecurityService } from '../../../services/security.service';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  private urlClientes = environment.appUrl + 'clientes/';
  public nuevoClienteFormGroup: FormGroup;
  private usuario: UsuarioI;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<NuevoClienteComponent>,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private securitySvc: SecurityService,
    private snackBar: MatSnackBar,
  ) {
    this.nuevoClienteFormGroup = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      empresa: ['', [Validators.minLength(3)]],
      telefono: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      correo: ['', [
        Validators.required,
        Validators.email]
      ],
    });
    // Inicializando variables
    this.usuario = jwt_decode(this.securitySvc.getToken());
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  // Enviando formulario
  onSubmitForm(dataForm) {
    this.isLoading = true;
    // Validando formulario
    if (!this.nuevoClienteFormGroup.valid) { this.isLoading = false; return };
    // Obtendiendo datos de formulario
    dataForm.usuario = this.usuario._id;
    this.dataSvc.post<any>(this.urlClientes, dataForm)
      .subscribe(res => {
        this.snackBar.open(res.body.message, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['green-snackbar'],
        });
        this.isLoading = false;
        this.dialogRef.close();
      }, err => {
        this.snackBar.open(err.error.message, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
        this.isLoading = false;
        console.log('Error', err);
      });
  }

  // Cancelando el formulario
  onClickCancelar(): void {
    this.nuevoClienteFormGroup.reset();
    this.dialogRef.close();
  }

  // Métodos de acceso formulario  
  get nombre() { return this.nuevoClienteFormGroup.get('nombre'); }

  get empresa() { return this.nuevoClienteFormGroup.get('empresa'); }

  get telefono() { return this.nuevoClienteFormGroup.get('telefono'); }

  get correo() { return this.nuevoClienteFormGroup.get('correo'); }
}

