import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  private urlUsuarios = environment.appUrl + 'usuarios/';
  public nuevoUsuarioFormGroup: FormGroup;
  public hide;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.nuevoUsuarioFormGroup = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      primer_apellido: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      segundo_apellido: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      correo: ['', [
        Validators.required,
        Validators.email]
      ],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(5)]
      ],
      rol: ['', Validators.required],
    });
    // Inicializando variables
    this.hide = true;
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  // Enviando formulario
  onSubmitForm(dataForm) {
    this.isLoading = true;
    // Validando formulario
    if (!this.nuevoUsuarioFormGroup.valid) { this.isLoading = false; return };
    // Obtendiendo datos de formulario
    this.dataSvc.post<any>(this.urlUsuarios, dataForm)
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
    this.nuevoUsuarioFormGroup.reset();
    this.dialogRef.close();
  }

  // Métodos de acceso formulario  
  get nombre() { return this.nuevoUsuarioFormGroup.get('nombre'); }

  get primer_apellido() { return this.nuevoUsuarioFormGroup.get('primer_apellido'); }

  get segundo_apellido() { return this.nuevoUsuarioFormGroup.get('segundo_apellido'); }

  get correo() { return this.nuevoUsuarioFormGroup.get('correo'); }

  get contrasena() { return this.nuevoUsuarioFormGroup.get('contrasena'); }

  get rol() { return this.nuevoUsuarioFormGroup.get('rol'); }
}

