import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { ClienteI } from 'src/app/interfaces/cliente.interface';
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['nombre', 'empresa', 'telefono', 'correo', 'acciones'];
  public dataSource = new MatTableDataSource();
  private urlClientes = environment.appUrl + 'clientes/';
  public isClientes: boolean;

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog
  ) {
    this.isClientes = false;
  }

  ngOnInit(): void {
    this.getAllClientes();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Clientes por página';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllClientes(): void {
    this.isClientes = false;
    this.dataSvc.get<ClienteI[]>(this.urlClientes)
      .subscribe(res => {
        this.dataSource.data = res.body;
        this.isClientes = true;
      }),
      err => {
        console.log('Error al recuperar la lista de clientes', err);
        this.isClientes = true;
      };
  }

  openNewCliente(): void {
    let dialogRef = this.dialog.open(NuevoClienteComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllClientes();
    });
  }

  openEditCliente(cliente): void {
    let dialogRef = this.dialog.open(EditarClienteComponent, { data: cliente });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllClientes();
    });
  }

  openDeleteCliente(cliente): void {
    let dialogRef = this.dialog.open(EliminarClienteComponent, { data: cliente });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllClientes();
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


