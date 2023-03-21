import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {


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
      private route: ActivatedRoute,
      private router : Router,
      private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resp => {
      this.tecnico = resp;
    });
  }

  deletarTecnico(): void{
    this.service.delete(this.tecnico.id).subscribe(()  => {
      this.toast.info('Técnico excluido', 'Exclusão')
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
  

}
