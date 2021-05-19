import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-eliminar-asunto',
  templateUrl: './eliminar-asunto.component.html',
  styleUrls: ['./eliminar-asunto.component.css']
})
export class EliminarAsuntoComponent implements OnInit {
  private urlAsuntos = environment.appUrl + 'asuntos/';
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EliminarAsuntoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataSvc: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  // Enviando
  onSubmit() {
    this.isLoading = true;
    this.dataSvc.delete<any>(this.urlAsuntos + this.data._id)
      .subscribe(res => {
        this.snackBar.open('¡Eliminación de asunto realizado con éxito!', '', {
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
