import { shareReplay, bufferCount, map, filter } from 'rxjs';
import useViewportObserver from './useViewportObserver';

export default function useDirectionObserver() {
  return (count = 6) => {
    const create = useViewportObserver();
    return create().pipe(
      map(([, scroll]) => scroll), // pluck(1)
      map(scroll => scroll.direction), // pluck('direction')
      bufferCount(count, 1),
      map(
        buffer =>
          buffer.reduce((result, direction) => result + direction.y, 0) /
          buffer.length
      ),
      filter(direction => !(direction % 1)),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  };
}
