import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  private urlUsuarios = environment.appUrl + 'usuarios/';
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataSvc: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  // Enviando
  onSubmit() {
    this.isLoading = true;
    this.dataSvc.delete<any>(this.urlUsuarios + this.data._id)
      .subscribe(res => {
        this.snackBar.open('¡Eliminación de usuario realizada con éxito!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar'],
        });
        this.isLoading = false;
        this.dialogRef.close();
      }, err => {
        this.snackBar.open(err.error.message, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['red-snackbar'],
        });
        this.isLoading = false;
        console.log('Error', err);
      });
  }

  // Cancelando el formulario
  onClickCancelar(): void {
    this.dialogRef.close();
  }
}
