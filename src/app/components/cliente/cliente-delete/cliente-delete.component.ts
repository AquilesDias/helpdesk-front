import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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
      private service : ClienteService,
      private toast : ToastrService,
      private route : Router,
      private router : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.router.snapshot.paramMap.get('id');
    this.findById();
  }


  findById() : void {
    this.service.findById(this.cliente.id). subscribe(resp => {
      this.cliente = resp;
    });
  }

  delete() : void {
    this.service.delete(this.cliente.id).subscribe(() =>{
      this.toast.info("Cliente excluido", "Exclusão");
      this.route.navigate(["../"]);
    }, ex => {
        console.log(ex);
        if(ex.error.erros){
          ex.error.forEach( element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
    })
  }


}
