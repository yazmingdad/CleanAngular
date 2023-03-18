import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'hr',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./modules/hr/hr.module').then((m) => m.HRModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
