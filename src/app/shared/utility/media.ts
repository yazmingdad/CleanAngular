import { fromEvent, Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    filter((list: MediaQueryList) => list.matches),
    map(() => true)
  );
}
