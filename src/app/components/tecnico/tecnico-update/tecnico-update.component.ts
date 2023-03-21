import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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

  constructor(
               private service: TecnicoService, 
               private toast: ToastrService, 
               private router: Router,
               private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  nome  : FormControl = new FormControl(null, [Validators.required,Validators.maxLength(30),Validators.minLength(3)]);
  email : FormControl = new FormControl(null, [Validators.required,Validators.email]);
  senha : FormControl = new FormControl(null, [Validators.required,Validators.minLength(3)]);
  cpf   : FormControl = new FormControl(null, [Validators.required]);

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    })

  }

  atualizarTecnico(): void{
    this.service.update(this.tecnico).subscribe(()  => {
      this.toast.success('Técnico atualizado', 'Atualização')
      this.router.navigate(["tecnicos"])
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
