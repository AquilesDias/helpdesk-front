import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from './../../../models/chamado';
import { Cliente } from './../../../models/cliente';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ChamadoService } from 'src/app/services/chamado.service';


@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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

  tecnicos : Tecnico[]  = [];
  clientes : Cliente[]  = [];


  constructor( 
     private chamadoService : ChamadoService,
     private tecnicoService : TecnicoService,
     private clienteService : ClienteService,
     private toast          : ToastrService,
     private route          : Router
  ) { }



  ngOnInit(): void {
    this.findAllTecnico();
    this.findAllCliente();
  }

  save(){
    this.chamadoService.save(this.chamado).subscribe(resp => {
     this.toast.success("Chamado criado com sucesso", "Chamado");
     this.route.navigate(['chamados']);
    }, ex => {
        if(ex.error.erros){
          ex.error.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }      
    } );
  }

  findAllCliente(){
    this.clienteService.findAll().subscribe(resp => {
      this.clientes = resp;
    })
  }

  findAllTecnico(){
    this.tecnicoService.findAllTecnicos().subscribe(resp => {
      this.tecnicos = resp;
    });
  }

  titulo     : FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);
  status     : FormControl = new FormControl("", [Validators.required]);
  prioridade : FormControl = new FormControl("", [Validators.required]);
  tecnico    : FormControl = new FormControl("", [Validators.required]);
  cliente    : FormControl = new FormControl("", [Validators.required]);
  observacao : FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);

  validationFields() : boolean{
    return this.titulo.valid && this.status.valid && this.prioridade.valid && this.tecnico.valid && this.cliente.valid && this.observacao.valid;
  }
}
