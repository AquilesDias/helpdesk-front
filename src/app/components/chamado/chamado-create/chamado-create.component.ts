import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
