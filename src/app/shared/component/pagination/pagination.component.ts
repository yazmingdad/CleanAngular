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
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
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

    if (currentPage === 1 && firstPage === 1) {
      return;
    }

    if (currentPage > firstPage) {
      currentPage--;
    }

    if (currentPage === firstPage) {
      if (firstPage > 1) {
        firstPage--;
        lastPage--;
        currentPage--;
      }
    }

    this.frame = { currentPage, firstPage, lastPage };
    this.getOptions();
    this.getPage.emit(currentPage - 1);
  }

  next() {
    let { currentPage, firstPage, lastPage } = this.frame;

    if (currentPage === lastPage && lastPage === this.numberOfPages) {
      return;
    }

    if (currentPage < lastPage) {
      currentPage++;
    }

    if (currentPage === lastPage) {
      if (lastPage < this.numberOfPages) {
        firstPage++;
        lastPage++;
        currentPage++;
      }
    }

    this.frame = { currentPage, firstPage, lastPage };
    this.getOptions();
    this.getPage.emit(currentPage - 1);
  }
}
