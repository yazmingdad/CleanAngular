import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

interface PaginationSetup<T> {
  list: T[];
  pageSize: number;
}
export class Paginator<T> {
  private pages: T[][];

  private list$: Subject<PaginationSetup<T>>;
  private input$: Subject<number>;

  output$: Observable<T[]>;
  numberOfPages$ = new BehaviorSubject<number>(1);

  constructor() {
    this.input$ = new Subject();
    this.list$ = new Subject();

    this.output$ = merge(
      // this.list$.pipe(switchMap((setup) => this.paginate(setup))),
      this.list$.pipe(map((setup) => this.paginated(setup))),
      this.input$.pipe(map((page) => this.pages[page]))
    );
  }

  private paginated(setup: PaginationSetup<T>) {
    const { list, pageSize } = setup;
    const numberOfPages = Math.ceil(list.length / pageSize);
    this.pages = Array.from({ length: numberOfPages }, (_, index) => {
      const start = index * pageSize;
      return list.slice(start, start + pageSize);
    });
    this.numberOfPages$.next(numberOfPages);
    return this.pages[0];
  }

  private paginate(setup: PaginationSetup<T>) {
    return new Observable<T[]>((observer) => {
      const { list, pageSize } = setup;
      const numberOfPages = Math.ceil(list.length / pageSize);
      this.pages = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * pageSize;
        return list.slice(start, start + pageSize);
      });
      this.numberOfPages$.next(numberOfPages);
      observer.next(this.pages[0]);
    });
  }

  setup(setup: PaginationSetup<T>) {
    this.list$.next(setup);
  }

  getPage(page: number) {
    this.input$.next(page);
  }
}
