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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
