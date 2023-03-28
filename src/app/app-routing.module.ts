import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
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
import { ChamadosListComponent } from './components/chamado/chamados-list/chamados-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';

const routes: Routes = [

  { path:"login", component:LoginComponent },

  { path:"",
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children:[

      { path:"home", component:HomeComponent },

      /** ===== ROTAS RELACIONADA AO TECNICO */
      
      { path: "tecnicos",             component:TecnicoListComponent   },
      { path: "tecnicos/create",      component:TecnicoCreateComponent },
      { path: "tecnicos/update/:id",  component:TecnicoUpdateComponent },
      { path: "tecnicos/delete/:id",  component:TecnicoDeleteComponent },

      /** ===== ROTAS RELACIONADA AO CLIENTE */

      { path: "clientes",            component:ClienteListComponent   },
      { path: "clientes/update/:id", component:ClienteUpdateComponent },
      { path: "clientes/create",     component:ClienteCreateComponent },
      { path: "clientes/delete/:id", component:ClienteDeleteComponent },

      /** ===== ROTAS RELACIONADA AO CLIENTE */
      { path: "chamados",            component:ChamadosListComponent  },
      { path: "chamados/create",     component:ChamadoCreateComponent },
      { path: "chamados/update",     component:ChamadoUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
