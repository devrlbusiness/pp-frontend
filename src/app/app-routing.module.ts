import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard';
import { TokenGuard } from './services/auth/token-guard';
import { InicioSesionComponent } from './components/auth/inicio-sesion/inicio-sesion.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaUsuarioComponent } from './components/administrar/usuario/lista-usuario/lista-usuario.component';
import { ListaAsuntoComponent } from './components/asunto/lista-asunto/lista-asunto.component';
import { ListaClienteComponent } from './components/cliente/lista-cliente/lista-cliente.component';

const routes: Routes = [
  { 
    path: '', 
    component: InicioSesionComponent,
  }, 
  {
    path: '',
    component: ToolbarComponent,
    canActivate: [AuthGuard, TokenGuard], 
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
      },
      { 
        path: 'administrar/usuario', 
        component: ListaUsuarioComponent,
      }, 
      { 
        path: 'asunto', 
        component: ListaAsuntoComponent,
      }, 
      { 
        path: 'cliente', 
        component: ListaClienteComponent,
      }, 
    ],
  },
  {
    path:'**', 
    redirectTo: ''
  }, 
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
