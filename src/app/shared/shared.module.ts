import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPowerOff, faLock } from '@fortawesome/free-solid-svg-icons';
@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [InputComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPowerOff, faLock);
  }
}
