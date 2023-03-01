import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export class Paginator<T> {
  private _list: T[];
  private _pageSize: number;
  private pages: T[][];

  private list$: Subject<T[]>;
  private pageNumber$: Subject<number>;
  private pageSize$: Subject<number>;

  page$: Observable<T[]>;
  numberOfPages$ = new BehaviorSubject<number>(1);

  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.pageSize$.next(pageSize);
  }

  set list(list: T[]) {
    this._list = list;
    this.list$.next(list);
  }

  constructor() {
    this.pageNumber$ = new Subject();
    this.pageSize$ = new Subject();
    this.list$ = new Subject();

    this.page$ = merge(
      this.pageSize$.pipe(switchMap(() => this.paginate())),
      this.list$.pipe(switchMap((list) => this.paginate())),
      this.pageNumber$.pipe(map((page) => this.pages[page]))
    );
  }

  private paginate() {
    if (this._list && this._pageSize > 0) {
      return new Observable<T[]>((observer) => {
        const numberOfPages = Math.ceil(this._list.length / this._pageSize);
        this.pages = Array.from({ length: numberOfPages }, (_, index) => {
          const start = index * this._pageSize;
          return this._list.slice(start, start + this._pageSize);
        });
        this.numberOfPages$.next(numberOfPages);
        observer.next(this.pages[0]);
      });
    }

    return throwError(() => new Error('Sorry Cannot Paginate'));
  }

  getPage(page: number) {
    this.pageNumber$.next(page);
  }

  setList(list: T[]) {
    this.list$.next(list);
  }
}
