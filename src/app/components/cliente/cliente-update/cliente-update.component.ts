import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
     
    cliente : Cliente = {
    
      id: '',
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      perfis: [],
      dataCriacao: ''   
    }

  hide = true;

  constructor(
      private service : ClienteService,
      private route   : ActivatedRoute,
      private router  : Router,
      private toast   : ToastrService
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  nome : FormControl = new FormControl (null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  senha : FormControl = new FormControl (null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email : FormControl = new FormControl (null, [Validators.required, Validators.email]);
  cpf : FormControl = new FormControl (null, [Validators.required]);


  findById() : void{
    this.service.findById(this.cliente.id).subscribe(resp => {
      resp.perfis = [];
      this.cliente = resp;
    })
  }

  update() : void{
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado', 'Atualização');
      this.router.navigate(['../']);
    }, ex => {
        console.log(ex);
        if(ex.error.erros){
          ex.error.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message)
          }
    }
    )
  }

  addPerfil(perfil : any) : void {
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      console.log(this.cliente.perfis)
    } else {
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis);
    }
  }

  validationFields():boolean{
    return this.nome.valid && this.email.valid && this.senha.valid && this.cpf.valid;
  }
}
