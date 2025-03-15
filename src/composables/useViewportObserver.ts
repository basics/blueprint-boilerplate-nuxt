import { combineLatest, shareReplay } from 'rxjs';
import useScrollObserver from './useScrollObserver';
import useResizeObserver from './useResizeObserver';

export default function useViewportObserver() {
  const createScrollObserver = useScrollObserver();
  const createResizeObserver = useResizeObserver();
  return () => {
    return combineLatest([createResizeObserver(), createScrollObserver()]).pipe(
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  };
}
