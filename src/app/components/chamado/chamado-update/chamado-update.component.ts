import { Cliente } from './../../../models/cliente';
import { Tecnico } from './../../../models/tecnico';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../services/cliente.service';
import { TecnicoService } from './../../../services/tecnico.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Chamado } from './../../../models/chamado';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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

  titulo     : FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);
  status     : FormControl = new FormControl("", [Validators.required]);
  prioridade : FormControl = new FormControl("", [Validators.required]);
  tecnico    : FormControl = new FormControl("", [Validators.required]);
  cliente    : FormControl = new FormControl("", [Validators.required]);
  observacao : FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);

  tecnicos : Tecnico[]  = [];
  clientes : Cliente[]  = [];

  constructor(
     private chamadoService : ChamadoService,
     private tecnicoService : TecnicoService,
     private clienteService : ClienteService,
     private toast          : ToastrService,
     private route          : Router,
     private router         : ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.router.snapshot.paramMap.get('id');
    this.findById();
    this.findAllTecnico();
    this.findAllCliente();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resp => {
      this.chamado = resp;
    });
  }

  update(): void{
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toast.success('Alterado com sucesso!', 'Atualizar chamado');
      this.route.navigate(['chamados']);
    }, ex => {
      if(ex.error.erros){
        ex.error.forEach(element => {
          this.toast.error(element.message);
        });     
      }
      else {
        this.toast.error(ex.error.message)
      }
    })
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

  findAllCliente(){
    this.clienteService.findAll().subscribe(resp => {
      this.clientes = resp;
    })
  }

  findAllTecnico():void{
    this.tecnicoService.findAllTecnicos().subscribe(resp => {
      this.tecnicos = resp;
    });
  }

  validationFields() : boolean{
    return this.titulo.valid && this.status.valid && this.prioridade.valid && this.tecnico.valid && this.cliente.valid && this.observacao.valid;
  }

}
