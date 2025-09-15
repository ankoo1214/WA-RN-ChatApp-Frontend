import { createContext, useState } from 'react';
export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};
