import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  private urlUsuarios = environment.appUrl + 'usuarios/';
  public editarUsuarioFormGroup: FormGroup;
  public hide;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.editarUsuarioFormGroup = this.fb.group({
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
      contrasena: ['', Validators.minLength(5)],
      rol: ['', Validators.required],
    });
    // Inicializando variables
    this.hide = true;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.editarUsuarioFormGroup.patchValue({
      nombre: this.data.nombre,
      primer_apellido: this.data.primer_apellido,
      segundo_apellido: this.data.segundo_apellido,
      correo: this.data.correo,
      rol: this.data.rol,
    });
  }

  // Enviando formulario
  onSubmitForm(dataForm) {
    this.isLoading = true;
    // Validando formulario
    if (!this.editarUsuarioFormGroup.valid) { this.isLoading = false; return };
    // Obtendiendo datos de formulario
    this.dataSvc.patch<any>(this.urlUsuarios + this.data._id, dataForm)
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
    this.editarUsuarioFormGroup.reset();
    this.dialogRef.close();
  }

  // Métodos de acceso formulario  
  get nombre() { return this.editarUsuarioFormGroup.get('nombre'); }

  get primer_apellido() { return this.editarUsuarioFormGroup.get('primer_apellido'); }

  get segundo_apellido() { return this.editarUsuarioFormGroup.get('segundo_apellido'); }

  get correo() { return this.editarUsuarioFormGroup.get('correo'); }

  get contrasena() { return this.editarUsuarioFormGroup.get('contrasena'); }

  get rol() { return this.editarUsuarioFormGroup.get('rol'); }
}


