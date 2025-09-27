import { createContext, useState } from 'react';
export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [demo, setDemo] = useState('');
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);
  const value = {
    demo,
    setDemo,
    addContactModalVisible,
    setAddContactModalVisible,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
