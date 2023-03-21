import { Component } from '@angular/core';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  show = false;
  message = '';

  constructor(private service: ConfirmationService) {
    service.show$.subscribe(({ status, message }) => {
      this.show = status;
      if (message) {
        this.message = message;
      } else {
        this.message = 'Are you sure to proceed?';
      }
    });
  }
  onValidate(event: boolean) {
    this.service.validate(event);
  }
  onDismiss() {
    this.service.dismiss();
  }
}
