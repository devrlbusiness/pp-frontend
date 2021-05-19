import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { SecurityService } from '../../../services/security.service';
import { ClienteI } from 'src/app/interfaces/cliente.interface';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nuevo-asunto',
  templateUrl: './nuevo-asunto.component.html',
  styleUrls: ['./nuevo-asunto.component.css']
})
export class NuevoAsuntoComponent implements OnInit {
  private urlAsuntos = environment.appUrl + 'asuntos/';
  private urlClientes = environment.appUrl + 'clientes/';
  public clientes: ClienteI[];
  public nuevoAsuntoFormGroup: FormGroup;
  private usuario: UsuarioI;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<NuevoAsuntoComponent>,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private securitySvc: SecurityService,
    private snackBar: MatSnackBar,
  ) {
    this.nuevoAsuntoFormGroup = this.fb.group({
      expediente: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      organo: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      tipo_asunto: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      tipo_servicio_asunto: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      fecha_inicio: ['', Validators.required],
      estado_procesal: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      tramite_siguiente: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      observaciones: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      cliente: ['', Validators.required],
    });
    // Inicializando variables
    this.clientes = [];
    this.usuario = jwt_decode(this.securitySvc.getToken());
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes(): void {
    this.dataSvc.get<any[]>(this.urlClientes)
      .subscribe(res => {
        this.clientes = res.body;
      }),
      err => {
        console.log('Error al recuperar la lista de appUsuarios', err);
      };
  }

  // Enviando formulario
  onSubmitForm(dataForm) {
    this.isLoading = true;
    // Validando formulario
    if (!this.nuevoAsuntoFormGroup.valid) { this.isLoading = false; return };
    // Obtendiendo datos de formulario
    dataForm.usuario = this.usuario._id;
    this.dataSvc.post<any>(this.urlAsuntos, dataForm)
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
    this.nuevoAsuntoFormGroup.reset();
    this.dialogRef.close();
  }

  // Métodos de acceso formulario  
  get expediente() { return this.nuevoAsuntoFormGroup.get('expediente'); }

  get organo() { return this.nuevoAsuntoFormGroup.get('organo'); }

  get tipo_asunto() { return this.nuevoAsuntoFormGroup.get('tipo_asunto'); }

  get tipo_servicio_asunto() { return this.nuevoAsuntoFormGroup.get('tipo_servicio_asunto'); }

  get fecha_inicio() { return this.nuevoAsuntoFormGroup.get('fecha_inicio'); }

  get estado_procesal() { return this.nuevoAsuntoFormGroup.get('estado_procesal'); }

  get tramite_siguiente() { return this.nuevoAsuntoFormGroup.get('tramite_siguiente'); }

  get observaciones() { return this.nuevoAsuntoFormGroup.get('observaciones'); }

  get cliente() { return this.nuevoAsuntoFormGroup.get('cliente'); }
}

