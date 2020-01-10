import { Store } from 'redux';

export class Subscription {
  store: Store
  listeners: Function[]
  unsubscribe: Function | null

  constructor(store: Store) {
    this.store = store;
    this.listeners = [];
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
    this.unsubscribe = null;
  }

  addSub(listener: Function) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(callback => callback());
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
