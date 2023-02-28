import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  input$: Subject<Command>;
  output$: Observable<Command[]>;

  constructor() {
    this.input$ = new Subject<Command>();
    this.output$ = this.input$.pipe(
      // calling pipe one time to prevent creating many observables;
      scan((acc: Command[], value: Command) => {
        switch (value.type) {
          case 'clear':
            return acc.filter((c) => c.id !== value.id);
          default:
            return [value, ...acc];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();

    this.input$.next({
      id,
      type: 'success',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();

    this.input$.next({
      id,
      type: 'error',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.input$.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
