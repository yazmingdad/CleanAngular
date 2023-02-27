import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './component/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPowerOff, faLock } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from './component/pagination/pagination.component';
import { SearchComponent } from './component/search/search.component';
@NgModule({
  declarations: [InputComponent, SearchComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [InputComponent, SearchComponent, PaginationComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPowerOff, faLock);
  }
}
