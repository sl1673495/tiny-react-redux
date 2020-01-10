import React, { useContext } from 'react';
import { Store } from 'redux';
import { Subscription } from './Subscription';

interface ContextType {
  store: Store;
  subscription: Subscription;
}
export const Context = React.createContext<ContextType | null>(null);

export function useReduxContext() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );
  }

  return contextValue;
}
