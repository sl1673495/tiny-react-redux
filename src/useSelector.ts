import { useReducer, useRef, useEffect } from 'react';
import { useReduxContext } from './Context';

type Selector<State, Selected> = (state: State) => Selected;
type EqualityFn<Selected> = (a: Selected, b: Selected) => boolean;

const defaultEqualityFn = <T>(a: T, b: T) => a === b;
export function useSelector<State, Selected>(
  selector: Selector<State, Selected>,
  equalityFn: EqualityFn<Selected> = defaultEqualityFn,
) {
  const { store } = useReduxContext();
  const [, forceRender] = useReducer(s => s + 1, 0);

  const selectedState = selector(store.getState());
  const latestSelectedState = useRef<Selected>(selectedState);

  function checkForUpdates() {
    const newSelectedState = selector(store.getState());

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    }

    latestSelectedState.current = newSelectedState;
    forceRender();
  }

  // store被dispatch触发改变后 执行checkForUpdates
  useEffect(() => {
    const unsubscribe = store.subscribe(checkForUpdates);
    return unsubscribe;
  }, []);

  return selectedState;
}
