import React, { useState, useCallback, memo } from 'react';
import { Card } from 'antd';
import { Provider, useSelector, useDispatch } from '../src';
import { store, State, ActionType } from './store';
import './index.css';
import 'antd/dist/antd.css';

const Button: React.FC<{ onClick: any }> = memo(props => {
  console.log('button render');
  return <button {...props} />;
});

function Count() {
  const count = useSelector((state: State) => state.count);
  const dispatch = useDispatch<ActionType>();
  // 同步的add
  const add = useCallback(() => dispatch({ type: 'add' }), []);

  console.log('count render');
  return (
    <section className="wrap">
      <Card hoverable style={{ marginBottom: 24 }}>
        <div className="chunk">
          <div className="chunk">store中的count现在是 {count}</div>
          <Button onClick={add}>add</Button>
        </div>
      </Card>
    </section>
  );
}

function Chat() {
  const message = useSelector((state: State) => state.message);
  const dispatch = useDispatch<ActionType>();
  const [value, setValue] = useState('');

  console.log('chat render');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'chat',
      payload: value,
    });
  };

  return (
    <Card hoverable>
      <h1>聊天室</h1>
      当前消息是: {message}
      <form onSubmit={onSubmit}>
        <input onChange={e => setValue(e.target.value)} placeholder="请输入消息" />
      </form>
    </Card>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <Count />
      <Chat />
    </Provider>
  );
};
