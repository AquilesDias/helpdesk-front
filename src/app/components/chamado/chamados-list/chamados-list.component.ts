import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  chamado : Chamado = {

    id : '1',
    dataAbertura : '12/12/12',
    dataFechamento: '12/12/12',
    prioridade: 'ALTA',
    status : 'ABERTA',
    titulo: 'FORMATAÇÃO',
    observacoes: 'NOT NULL',
    cliente: 'Goku',
    tecnico: 'Gohan',
    nomeCliente: 'Naruto',
    nomeTecnico: 'Sasuke',

  }

  ELEMENT_DATA : Chamado [] = [this.chamado];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
