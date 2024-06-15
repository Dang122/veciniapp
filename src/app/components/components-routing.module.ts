import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaUserComponent } from './incidencias/incidencia-user/incidencia-user.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservasAdminComponent } from './reservas-admin/reservas-admin.component';
import { ErrorComponent } from './error-404/error-404.component';
import { ResidenciasComponent } from './residencias/residencias.component';
import { roleGuard } from '../core/guards/role.guard';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard], data: { expectedRole: 'admin' } },
  { path: 'users', component: UsersComponent ,canActivate: [roleGuard], data: { expectedRole: 'admin' }},
  { path: 'incidencias',component:IncidenciasComponent, canActivate: [roleGuard], data: { expectedRole: 'admin' }} ,
  { path: 'incidencia',component: IncidenciaUserComponent},
  { path: 'anuncios',component: AnunciosComponent, canActivate: [roleGuard], data: { expectedRole: 'admin' }},
  { path: 'dashboard-user', component: DashboardUserComponent },
  { path: 'reserva',component: ReservasComponent},
  { path: 'reservas-admin',component:  ReservasAdminComponent, canActivate: [roleGuard], data: { expectedRole: 'admin' }},
  { path: 'error_404', component: ErrorComponent},
  { path: 'residencias', component:ResidenciasComponent, canActivate: [roleGuard], data: { expectedRole: 'admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
