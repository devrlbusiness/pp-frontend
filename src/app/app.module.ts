import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { JwtInterceptor } from './services/auth/jwt-interceptor';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InicioSesionComponent } from './components/auth/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaUsuarioComponent } from './components/administrar/usuario/lista-usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './components/administrar/usuario/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './components/administrar/usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './components/administrar/usuario/eliminar-usuario/eliminar-usuario.component';
import { ListaAsuntoComponent } from './components/asunto/lista-asunto/lista-asunto.component';
import { NuevoAsuntoComponent } from './components/asunto/nuevo-asunto/nuevo-asunto.component';
import { EditarAsuntoComponent } from './components/asunto/editar-asunto/editar-asunto.component';
import { EliminarAsuntoComponent } from './components/asunto/eliminar-asunto/eliminar-asunto.component';
import { ListaClienteComponent } from './components/cliente/lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './components/cliente/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './components/cliente/eliminar-cliente/eliminar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    InicioSesionComponent,
    InicioComponent,
    ListaUsuarioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    ListaAsuntoComponent,
    NuevoAsuntoComponent,
    EditarAsuntoComponent,
    EliminarAsuntoComponent,
    ListaClienteComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NgxMatIntlTelInputModule,
  ],

  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true, 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
