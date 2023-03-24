import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  ELEMENT_DATA : Chamado [] = [];
  FILTERED_DATA : Chamado [] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe( resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource = new MatTableDataSource<Chamado>(resp);
        this.dataSource.paginator = this.paginator;
    });
  }

  returnStatus(status: any ): string { 
    if(status == '0'){ return "ABERTO"; }
    else if( status == '1'){ return "ANDAMENTO" }
    else { return "ENCERRADO"}
  }

  returnPrioridade(prioridade:any):string{
    if(prioridade == '0'){return 'BAIXA'}
    else if (prioridade == '1'){return 'MÉDIA'}
    else { return 'ALTA'}
  }

  orderByStatus(status : any ):void{
    let list : Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element);
      }
      this.FILTERED_DATA = list;
      this.dataSource = new MatTableDataSource<Chamado>(list);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
