import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../services/data.service';
import { UsuarioI } from 'src/app/interfaces/usuario.interface';
import { NuevoUsuarioComponent } from '../nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['nombre', 'primer_apellido', 'segundo_apellido', 'correo', 'rol', 'acciones'];
  public dataSource = new MatTableDataSource();
  private urlUsuarios = environment.appUrl + 'usuarios/';
  public isUsuarios: boolean;

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog
  ) {
    this.isUsuarios = false;
  }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Usuarios por página';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllUsuarios(): void {
    this.isUsuarios = false;
    this.dataSvc.get<UsuarioI[]>(this.urlUsuarios)
      .subscribe(res => {
        this.dataSource.data = res.body;
        this.isUsuarios = true;
      }),
      err => {
        console.log('Error al recuperar la lista de usuarios', err);
        this.isUsuarios = true;
      };
  }

  openNewUsuario(): void {
    let dialogRef = this.dialog.open(NuevoUsuarioComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsuarios();
    });
  }

  openEditUsuario(usuario): void {
    let dialogRef = this.dialog.open(EditarUsuarioComponent, { data: usuario });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsuarios();
    });
  }

  openDeleteUsuario(usuario): void {
    let dialogRef = this.dialog.open(EliminarUsuarioComponent, { data: usuario });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsuarios();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


