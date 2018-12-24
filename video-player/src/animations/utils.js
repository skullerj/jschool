import { Subject, interval, animationFrameScheduler, combineLatest, Observable, defer, fromEvent } from 'rxjs';
import {
  scan,
  map,
  tap,
  filter,
  takeUntil,
  takeWhile,
  mergeMap,
  merge,
  switchMap
} from 'rxjs/operators';

export const pixelsPerSecond = v => ms => (v * ms) / 1000;

export const timer = (duration, scheduler = animationFrameScheduler) => {
  return defer(() => {
    const startTime = scheduler.now();
    return interval(0, scheduler).pipe(
      map(() => scheduler.now() - startTime),
      map(ms => ms / duration),
      takeWhile(progress => progress <= 1)
    );
  });
};

export const notchBounce = clickEvent$ => {
  const windowUp$ = fromEvent(window, 'mouseup').pipe(
    map(e => ({ type: 'mouseup' }))
  );
  return clickEvent$.pipe(
    merge(windowUp$),
    map(e => e.type),
    filter(e => e === 'mousedown' || e === 'mouseup'),
    switchMap(type => {
      return timer(300).pipe(map(t => type));
    }),
    scan((acc, type) => {
      const val = type === 'mousedown' ? acc + 0.1 : acc - 0.1;
      return val <= 0 ? 0 : val >= 1 ? 1 : val;
    }, 0),
    map(value => 1 + 0.5 * value)
  );
};

export const notchDrag = (notchClick$, width) => {
  const windowUp$ = fromEvent(window, 'mouseup');
  const windowMove$ = fromEvent(window, 'mousemove');
  return notchClick$
    .pipe(
      mergeMap(clickEvent => {
        return windowMove$.pipe(
          takeUntil(windowUp$),
          scan(
            (progress, e) => progress + e.movementX / width,
            clickEvent.startAt
          )
        );
      })
    )
    .pipe(
      map(progress => progress),
      map(p => (p >= 1 ? 1 : p <= 0 ? 0 : p))
    );
};
