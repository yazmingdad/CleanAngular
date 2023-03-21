import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() isCentered = true;
  @Output() dismiss = new EventEmitter();
  @Output() validate = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const container = document.querySelector('.main-container');
    if (container) {
      container.appendChild(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }

  onConfirm(confirmation: boolean) {
    this.validate.emit(confirmation);
  }
}
