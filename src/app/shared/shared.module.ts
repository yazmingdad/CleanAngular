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
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ModalComponent } from './component/modal/modal.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { SelectComponent } from './component/select/select.component';
import { InputFileComponent } from './component/input-file/input-file.component';

@NgModule({
  declarations: [
    InputComponent,
    SearchComponent,
    PaginationComponent,
    NotFoundComponent,
    ModalComponent,
    SpinnerComponent,
    SelectComponent,
    InputFileComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    InputComponent,
    InputFileComponent,
    SelectComponent,
    SearchComponent,
    PaginationComponent,
    NotFoundComponent,
    SpinnerComponent,
    ModalComponent,
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPowerOff, faLock);
  }
}
