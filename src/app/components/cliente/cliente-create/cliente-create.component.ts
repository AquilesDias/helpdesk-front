import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {


  hide = true;

  cliente : Cliente = {
    
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''   
  }

  constructor(
      private service:ClienteService,
      private toast:ToastrService,
      private route:Router
  ) { }

  ngOnInit(): void {
  }

  nome : FormControl = new FormControl (null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  senha : FormControl = new FormControl (null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email : FormControl = new FormControl (null, [Validators.required, Validators.email]);
  cpf : FormControl = new FormControl (null, [Validators.required]);

  save(){
    this.service.save(this.cliente).subscribe(resp => {
      this.toast.success('Cliente efetuado com sucesso!', "Cadastro");
      this.route.navigate(["clientes"]);
    }, ex => {
        console.log(ex);
        if(ex.error.erros){
          ex.error.forEach( element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
    });
  }

  addPerfil(perfil: any): void{

    if(this.cliente.perfis.includes(perfil)){
        this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
        console.log(this.cliente.perfis)
    } else {
       this.cliente.perfis.push(perfil);
       console.log(this.cliente.perfis) 
      }
    }
  
    validationFields():boolean{
      return this.nome.valid && this.email.valid && this.senha.valid && this.cpf.valid;
    }

}
