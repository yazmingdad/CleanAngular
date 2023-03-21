import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  faUser,
  faPowerOff,
  faUserPlus,
  faLock,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MenuComponent } from './layout/sidebar/menu/menu.component';
import { NotificationListComponent } from './layout/notification-list/notification-list.component';
import { MenuItemComponent } from './layout/sidebar/menu-item/menu-item.component';
import { ConfirmationComponent } from './layout/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    NotificationListComponent,
    MenuItemComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faPowerOff, faUserPlus, faLock, faCheck);
  }
}
