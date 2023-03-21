import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },

  {
    path:"",
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:"home",
        component:HomeComponent
      },
      {
        path:"tecnico-list",
        component:TecnicoListComponent
      },
      {
        path: "tecnico-create",
        component:TecnicoCreateComponent
      },
      {
        path: "tecnico-update/:id",
        component:TecnicoUpdateComponent
      },
      {
        path: "tecnico-delete/:id",
        component:TecnicoDeleteComponent
      },
      {
        path:"clientes",
        component:ClienteListComponent
      },
      {
        path:"update/:id",
        component:ClienteUpdateComponent
      },
      {
        path:"create",
        component:ClienteCreateComponent
      },
      {
        path:"delete/:id",
        component:ClienteDeleteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
