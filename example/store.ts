import { createStore } from 'redux';

type AddAction = {
  type: 'add';
};

type ChatAction = {
  type: 'chat';
  payload: string;
};

const initState = {
  count: 0,
  message: 'Hello',
};

function reducer(state: typeof initState, action: ActionType) {
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
    default:
      return initState;
  }
}

export const store = createStore(reducer);

export type State = typeof initState;

export type ActionType = AddAction | ChatAction;
