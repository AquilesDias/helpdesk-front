import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico : Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  hide = true;

  nome  = new FormControl(null, [Validators.required,Validators.maxLength(30),Validators.minLength(3)]);
  email = new FormControl(null, [Validators.required,Validators.email]);
  senha = new FormControl(null, [Validators.required,Validators.minLength(3)]);
  cpf   = new FormControl(null, [Validators.required]);

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  saveTecnico(): void{
    this.service.saveTecnico(this.tecnico).subscribe(()  => {
      this.toast.success('Técnico cadastrado', 'Cadastro')
      this.router.navigate(["/tecnico-list"])
  }, ex => {
       console.log(ex);
       if(ex.error.errors){
          ex.error.forEach(element => {
            this.toast.error(element.message);
          });
       } else {
          this.toast.error(ex.error.message)
       }
    }
  )}

  addPerfil(perfil: any): void{

  if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
      console.log(this.tecnico.perfis)
  } else {
     this.tecnico.perfis.push(perfil);
     console.log(this.tecnico.perfis) 
    }
  }

  validationFields():boolean{
    return this.nome.valid && this.email.valid && this.senha.valid && this.cpf.valid;
  }

}
