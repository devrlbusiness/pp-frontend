import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { NuevoAsuntoComponent } from '../nuevo-asunto/nuevo-asunto.component';
import { EditarAsuntoComponent } from '../editar-asunto/editar-asunto.component';
import { EliminarAsuntoComponent } from '../eliminar-asunto/eliminar-asunto.component';

@Component({
  selector: 'app-lista-asunto',
  templateUrl: './lista-asunto.component.html',
  styleUrls: ['./lista-asunto.component.css']
})
export class ListaAsuntoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['expediente', 'organo', 'tipo_asunto', 'tipo_servicio_asunto', 'fecha_inicio', 'estado_procesal', 'tramite_siguiente', 'observaciones', 'cliente_nombre', 'acciones'];
  public dataSource = new MatTableDataSource();
  private urlAsuntos = environment.appUrl + 'asuntos/';
  public isAsuntos: boolean;

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog
  ) {
    this.isAsuntos = false;
  }

  ngOnInit(): void {
    this.getAllAsuntos();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Asuntos por página';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAsuntos(): void {
    this.isAsuntos = false;
    this.dataSvc.get<any>(this.urlAsuntos)
      .subscribe(res => {
        this.dataSource.data = res.body.map((c) => {
          c.cliente_nombre = c.cliente.nombre;
          return c;
        });
        this.dataSource.data = res.body;
        this.isAsuntos = true;
      }),
      err => {
        console.log('Error al recuperar la lista de asuntos', err);
        this.isAsuntos = true;
      };
  }

  openNewAsunto(): void {
    let dialogRef = this.dialog.open(NuevoAsuntoComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllAsuntos();
    });
  }

  openEditAsunto(asunto): void {
    let dialogRef = this.dialog.open(EditarAsuntoComponent, { data: asunto });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllAsuntos();
    });
  }

  openDeleteAsunto(asunto): void {
    let dialogRef = this.dialog.open(EliminarAsuntoComponent, { data: asunto });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllAsuntos();
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


