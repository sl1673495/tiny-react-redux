import React, { useState, useCallback } from 'react';
import { Card, Button, Input } from 'antd';
import { Provider, useSelector, useDispatch } from '../src';
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
        {logs.map((log, idx) => (
          <p className="log" key={idx}>
            {log}
          </p>
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
