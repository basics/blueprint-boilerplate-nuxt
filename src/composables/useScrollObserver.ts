import type { Observable } from 'rxjs';
import { fromEvent, startWith, map, share } from 'rxjs';
import { ipoint, point } from '@js-basics/vector';

const observers: Map<HTMLElement | Window, Observable<Event>> = new Map();

export default function useScrollObserver() {
  return (el: HTMLElement | Window = window) => {
    let lastPosition = getScrollPos();
    return createScrollObserver(el).pipe(
      map(position => {
        const clampPosition = ipoint(position.x, Math.max(position.y, 0));
        const direction = point(
          () =>
            (clampPosition - lastPosition) /
              Math.abs(clampPosition - lastPosition) || 0
        );
        lastPosition = clampPosition;
        return {
          position,
          direction
        };
      }),
      share()
    );
  };
}

function createScrollObserver(el: HTMLElement | Window = window) {
  let observer = observers.get(el);
  if (!observer) {
    observer = fromEvent(el, 'scroll', { passive: true });
    observers.set(el, fromEvent(el, 'scroll', { passive: true }));
  }
  return observer.pipe(
    startWith(0),
    map(() => getScrollPos(el)),
    share()
  );
}

function getScrollPos(el?: HTMLElement | Window) {
  const doc = window.document;
  const docElem = (doc && doc.documentElement) || {
    scrollLeft: 0,
    scrollTop: 0
  };
  if (el instanceof HTMLElement) {
    return ipoint(el.scrollLeft, el.scrollTop);
  } else {
    return ipoint(
      window.pageXOffset || docElem.scrollLeft,
      window.pageYOffset || docElem.scrollTop
    );
  }
}
