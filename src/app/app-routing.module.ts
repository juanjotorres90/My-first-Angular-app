import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers-dos/edit-server/edit-server.component';
import { ServerDosComponent } from './servers-dos/server-dos/server-dos.component';
import { ServersDosComponent } from './servers-dos/servers-dos.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers-dos/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers-dos/server-dos/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },
  { path: 'servers',
  // canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  component: ServersDosComponent,
  children: [
    { path: ':id', component: ServerDosComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ]},
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },

  { path: '**', redirectTo: '/not-found'} // ! Make sure it's the last one!
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot(appRoutes, {useHash: true}) // ! useHash old configuration
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
