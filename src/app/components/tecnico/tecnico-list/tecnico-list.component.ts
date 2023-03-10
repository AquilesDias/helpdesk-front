import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})

export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA : Tecnico [] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tecnicoService: TecnicoService ) { }

  ngOnInit(): void {
      this.findAllTecnico();
  }

  findAllTecnico(){
    this.tecnicoService.findAllTecnicos().subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Tecnico>(resp);
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

