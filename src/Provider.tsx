import React, { FC } from 'react';
import { Store } from 'redux';
import { Context } from './Context';

interface ProviderProps {
  store: Store;
}

export const Provider: FC<ProviderProps> = ({ store, children }) => {
  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
};
