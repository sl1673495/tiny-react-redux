import React, { useContext } from 'react';

export const Context = React.createContext(null);

export function useReduxContext() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );
  }

  return contextValue;
}
