import { useReduxContext } from './Context';
import { Dispatch, Action } from 'redux';

export function useDispatch<A extends Action>(): Dispatch<A> {
  const { store } = useReduxContext();
  return store.dispatch as Dispatch<A>;
}
