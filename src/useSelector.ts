import { useReducer, useRef, useEffect } from 'react';
import { useReduxContext } from './Context';

type Selector<State, Selected> = (state: State) => Selected;
type EqualityFn<Selected> = (a: Selected, b: Selected) => boolean;

const defaultEqualityFn = (a: any, b: any) => a === b;
export function useSelector<State, Selected>(
  selector: Selector<State, Selected>,
  equalityFn: EqualityFn<Selected> = defaultEqualityFn,
) {
  const { store, subscription } = useReduxContext();
  const [, forceRender] = useReducer(s => s + 1, 0);

  const latestSelectedState = useRef<any>();
  const selectedState = selector(store.getState());

  function checkForUpdates() {
    const newSelectedState = selector(store.getState());

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    }

    latestSelectedState.current = newSelectedState;
    forceRender();
  }

  // 渲染后 保存上一次的selector返回值
  useEffect(() => {
    latestSelectedState.current = selectedState;
  });

  // store被dispatch触发改变后 执行checkForUpdates
  useEffect(() => {
    subscription.addSub(checkForUpdates);
    subscription.trySubscribe();
  }, []);

  return selectedState;
}
