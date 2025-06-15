import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const fakeUsers = [{ username: 'admin', password: '1234' }];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ username, password }) => {
    const foundUser = fakeUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = ({ username, password }) => {
    fakeUsers.push({ username, password });
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
