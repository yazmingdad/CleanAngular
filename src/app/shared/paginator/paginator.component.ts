import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

interface PageFrame {
  currentPage: number;
  firstPage: number;
  lastPage: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input()
  numberOfPages: number;

  @Output()
  getPage = new EventEmitter<number>();

  frame: PageFrame;

  pageOptions: number[] = [];

  constructor() {}

  ngOnChanges() {
    try {
      this.resetUI();
    } catch {}
  }

  private resetUI() {
    this.frame = {
      currentPage: 1,
      firstPage: 1,
      lastPage: Math.min(this.numberOfPages, 5),
    };
    this.getOptions();
  }

  private getOptions() {
    this.pageOptions = [];
    for (let i = this.frame.firstPage; i <= this.frame.lastPage; i++) {
      this.pageOptions.push(i);
    }
  }

  onGetPage(page: number) {
    this.frame.currentPage = page;
    this.getPage.emit(page - 1);
  }

  prev() {
    let { currentPage, firstPage, lastPage } = this.frame;

    if (firstPage > 1) {
      if (currentPage === firstPage) {
        firstPage--;
        lastPage--;
      }
      currentPage--;

      this.frame = { currentPage, firstPage, lastPage };
      this.getOptions();
      this.getPage.emit(currentPage - 1);
    }
  }

  next() {
    let { currentPage, firstPage, lastPage } = this.frame;

    if (lastPage < this.numberOfPages) {
      if (currentPage === lastPage) {
        firstPage++;
        lastPage++;
      }
      currentPage++;
      this.frame = { currentPage, firstPage, lastPage };
      this.getOptions();
      this.getPage.emit(currentPage - 1);
    }
  }
}
