import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = {
      email: '',
      password: ''
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));
  

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  validationFields(): boolean {
    
      if(this.email.valid && this.password.valid){
        return true;
      }
      else {
        return false;
      }
  }

}
