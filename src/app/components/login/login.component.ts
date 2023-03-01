import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.toastr.error('Dados invalidos', 'Login');
    this.credenciais.password = '';
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
