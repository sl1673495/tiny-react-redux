import { createStore } from 'redux';

type AddAction = {
  type: 'add';
};

type ChatAction = {
  type: 'chat';
  payload: string;
};

type LogAction = {
  type: 'log';
  payload: string;
};

const initState = {
  count: 0,
  message: 'Hello',
  logs: [] as string[],
};

export type ActionType = AddAction | ChatAction | LogAction;
export type State = typeof initState;

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'chat':
      return {
        ...state,
        message: action.payload,
      };
    case 'log':
      return {
        ...state,
        logs: [action.payload, ...state.logs],
      };
    default:
      return initState;
  }
}

export const store = createStore(reducer);
