import { map, fromEvent, startWith, debounce, timer, share } from 'rxjs';
import { Point } from '@js-basics/vector';

export default function useResizeObserver() {
  return () =>
    fromEvent(window, 'resize').pipe(
      startWith(0),
      debounce(() => timer(350)),
      map(() => getWindowSize()),
      share()
    );
}

function getWindowSize() {
  const docElem = window.document.documentElement;
  return new Point(
    getSize(docElem.clientWidth, window.innerWidth),
    getSize(docElem.clientHeight, window.innerHeight)
  );
}

function getSize(a: number, b: number) {
  return a < b ? b : a;
}
