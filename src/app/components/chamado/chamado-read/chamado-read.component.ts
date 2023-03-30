import { Router, ActivatedRoute } from '@angular/router';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado : Chamado = {
    prioridade: '',
    status : '',
    titulo: '',
    observacoes:'',
    cliente: '',
    tecnico: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private chamadoService : ChamadoService,
    private route          : Router,
    private router         : ActivatedRoute 
 ) { }

  ngOnInit(): void {
    this.chamado.id = this.router.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resp => {
      this.chamado = resp;
    });
  }

  returnStatus(status : any): string{
    if(status == '0'){return 'ABERTO'}
    else if(status == '1'){return 'ANDAMENTO'}
    else { return 'ENCERRADO'}
  }

  returnPrioridade(prioridade : any) : string {
    if(prioridade == '0'){return 'BAIXA'}
    else if(prioridade == '1'){return 'MÉDIA'}
    else {return 'ALTA'}
  }

}
