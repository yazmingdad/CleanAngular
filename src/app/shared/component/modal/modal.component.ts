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
  @Output() dismiss = new EventEmitter();
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
}
