import React, { FC } from 'react';
import { Store } from 'redux';
import { Context } from './Context';
import { Subscription } from './Subscription';

interface ProviderProps {
  store: Store;
}

export const Provider: FC<ProviderProps> = ({ store, children }) => {
  const subscription = new Subscription(store);
  return <Context.Provider value={{ store, subscription }}>{children}</Context.Provider>;
};
