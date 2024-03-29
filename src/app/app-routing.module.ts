import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'mission',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./modules/mission/mission.module').then((m) => m.MissionModule),
  },
  {
    path: 'hr',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./modules/hr/hr.module').then((m) => m.HRModule),
  },
  {
    path: 'user',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
