import { createContext, useState } from 'react';

// create global memory variable with default value, to access from any react component
export const AuthenticationContext = createContext(null);
export const AuthenticationProvider = (props) => {
  const [val, setVal] = useState(false);
  const [token, setToken] = useState('');

  return (
    <AuthenticationContext.Provider value={{ val, setVal, token, setToken }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
