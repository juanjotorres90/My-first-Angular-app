import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
// import { UserService } from './users.service';
import { CounterService } from './counter.service';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers-dos/edit-server/edit-server.component';
import { ServersDosComponent } from './servers-dos/servers-dos.component';
import { ServerDosComponent } from './servers-dos/server-dos/server-dos.component';
import { ServersService } from './servers-dos/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers-dos/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers-dos/server-dos/server-resolver.service';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    SuccessAlertComponent,
    WarningAlertComponent,
    CockpitComponent,
    ServerElementComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    AccountComponent,
    NewAccountComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    HomeComponent,
    UsersComponent,
    UserComponent,
    EditServerComponent,
    ServersDosComponent,
    ServerDosComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AccountsService,
    LoggingService,
    CounterService,
    ServersService,
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    ServerResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    } // ! The order of the interceptors matters
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
