import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuarioComponent } from './users/modals/nuevo-usuario/nuevo-usuario.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './users/modals/editar-usuario/editar-usuario.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaUserComponent } from './incidencias/incidencia-user/incidencia-user.component';
import { SidebarComponent } from './incidencias/sidebar/sidebar.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SafeUrlPipe } from './incidencias/sidebar/safeUrl.pipe';
import { PreviewImagenComponent } from './incidencias/modals/preview/preview.component';
import { NewIncidenciaComponent } from './incidencias/modals/new-incidencia/new-incidencia.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { NewAnuncioComponent } from './anuncios/new-anuncio/new-anuncio.component';
import { EditAnuncioComponent } from './anuncios/edit-anuncio/edit-anuncio.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ReservasComponent } from './reservas/reservas.component';
import { PerfilComponent } from './navbar/perfil/perfil.component';
import { ChangePasswordComponent } from './navbar/change-password/change-password.component';
import { ReservasAdminComponent } from './reservas-admin/reservas-admin.component';
import { ErrorComponent } from './error-404/error-404.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewEspacioComponent } from './reservas-admin/modals/new-espacio/new-espacio.component';
import { EditarEspacioComponent } from './reservas-admin/modals/editar-espacio/editar-espacio.component';
import { EditarReservaComponent } from './reservas-admin/modals/editar-reserva/editar-reserva.component';
import { ResidenciasComponent } from './residencias/residencias.component';
import { EditarResidenciaComponent } from './residencias/editar-residencia/editar-residencia.component';
@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    UsersComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    IncidenciasComponent,
    IncidenciaUserComponent,
    SidebarComponent,
    SafeUrlPipe,
    PreviewImagenComponent,
    NewIncidenciaComponent,
    AnunciosComponent,
    NewAnuncioComponent,
    EditAnuncioComponent,
    DashboardUserComponent,
    NavbarUserComponent,
    ReservasComponent,
    PerfilComponent,
    ChangePasswordComponent,
    ReservasAdminComponent,
    ErrorComponent,
    EditarReservaComponent,
    EditarEspacioComponent,
    NewEspacioComponent,
    ResidenciasComponent,
    EditarResidenciaComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    CdkMenuModule,
    NgxPaginationModule
  ],
})
export class ComponentsModule {}
