import React from 'react';
import { Context } from './Context';
import { Subscription } from './Subscription';

export const Provider = ({ store, children }) => {
  const subscription = new Subscription(store);
  return <Context.Provider value={{ store, subscription }}>{children}</Context.Provider>;
};
