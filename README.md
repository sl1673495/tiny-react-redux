# tiny-react-redux

TypeScript实现最精简版本的react-redux

## 文档
https://sl1673495.github.io/tiny-react-redux/

## 目的
本仓库的编写目的是尽可能最小化还原react-redux的实现，以此来探究它是如何把redux和react连接起来。

## 示例

### 实现的核心api
1. `Provider` 在应用的最外层包裹，用来把redux的store传递给子组件。
2. `useSelector` 用来在页面中订阅store中的状态。
3. `useDispatch` 用来拿到redux的dispatch方法。

### redux store的定义
```ts
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
```

### 页面组件的编写
```ts
import React, { useState, useCallback } from 'react';
import { Card, Button, Input } from 'antd';
import { Provider, useSelector, useDispatch } from '../dist';
import { store, State, ActionType } from './store';
import './index.css';
import 'antd/dist/antd.css';

function Count() {
  const count = useSelector((state: State) => state.count);
  const dispatch = useDispatch<ActionType>();
  // 同步的add
  const add = useCallback(() => dispatch({ type: 'add' }), []);

  dispatch({
    type: 'log',
    payload: '计数器组件重新渲染🚀',
  });
  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="chunk">store中的count现在是 {count}</div>
        <Button onClick={add}>add</Button>
      </div>
    </Card>
  );
}

function Chat() {
  const message = useSelector((state: State) => state.message);
  const dispatch = useDispatch<ActionType>();
  const [value, setValue] = useState('');

  dispatch({
    type: 'log',
    payload: '聊天室组件重新渲染💐',
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'chat',
      payload: value,
    });
  };

  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>聊天室</h1>
      当前消息是: {message}
      <form onSubmit={onSubmit}>
        <Input onChange={e => setValue(e.target.value)} placeholder="请输入消息" />
      </form>
    </Card>
  );
}

function Logger() {
  const logs = useSelector((state: State) => state.logs);

  return (
    <Card hoverable>
      <h1>控制台</h1>
      <div className="logs">
        {logs.map(log => (
          <p className="log">{log}</p>
        ))}
      </div>
    </Card>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <div className="flex">
        <div className="left">
          <div className="count">
            <Count />
          </div>
          <div className="chat">
            <Chat />
          </div>
        </div>
        <div className="right">
          <Logger />
        </div>
      </div>
    </Provider>
  );
};
```
