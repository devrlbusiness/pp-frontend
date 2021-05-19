import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { SecurityService } from '../../../services/security.service';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  private urlClientes = environment.appUrl + 'clientes/';
  public editarClienteFormGroup: FormGroup;
  private usuario: UsuarioI;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private securitySvc: SecurityService,
    private snackBar: MatSnackBar,
  ) {
    this.editarClienteFormGroup = this.fb.group({
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
    this.editarClienteFormGroup.patchValue({
      nombre: this.data.nombre,
      empresa: this.data.empresa,
      telefono: this.data.telefono,
      correo: this.data.correo,
    });
  }

  // Enviando formulario
  onSubmitForm(dataForm) {
    this.isLoading = true;
    // Validando formulario
    if (!this.editarClienteFormGroup.valid) { this.isLoading = false; return };
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
    this.editarClienteFormGroup.reset();
    this.dialogRef.close();
  }

  // Métodos de acceso formulario  
  get nombre() { return this.editarClienteFormGroup.get('nombre'); }

  get empresa() { return this.editarClienteFormGroup.get('empresa'); }

  get telefono() { return this.editarClienteFormGroup.get('telefono'); }

  get correo() { return this.editarClienteFormGroup.get('correo'); }
}

