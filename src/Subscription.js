import { unstable_batchedUpdates as batch } from 'react-dom';

export class Subscription {
  constructor(store) {
    this.store = store;
    this.listeners = [];
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
    this.unsubscribe = null;
  }

  addSub(listener) {
    this.listeners.push(listener);
  }

  notify() {
    // 批量更新
    batch(() => {
      this.listeners.forEach(callback => callback());
    });
  }

  handleChangeWrapper() {
    this.notify()
  }

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.store.subscribe(this.handleChangeWrapper);
    }
  }
}
