import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  hide = true;

  nome  = new FormControl(null, [Validators.required,Validators.maxLength(30),Validators.minLength(3)]);
  email = new FormControl(null, [Validators.required,Validators.email]);
  senha = new FormControl(null, [Validators.required,Validators.minLength(3)]);
  cpf   = new FormControl(null, [Validators.required,Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]);

  constructor() { }

  ngOnInit(): void {
  }

  validationFields():boolean{
    return this.nome.valid && this.email.valid && this.senha.valid && this.cpf.valid;
  }

}
