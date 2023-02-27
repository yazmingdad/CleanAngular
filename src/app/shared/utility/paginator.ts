import { BehaviorSubject, Observable, Subject } from 'rxjs';

export abstract class Paginator<T> {
  protected list: T[];
  protected currentList: T[];
  private pageSize: number;
  private pages: T[][];

  pagesOutput: Observable<T[]>;

  numberOfPages: BehaviorSubject<number>;

  abstract search(query: string): T[];

  getPage(page: number): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      observer.next(this.pages[page]);
    });
  }
}
