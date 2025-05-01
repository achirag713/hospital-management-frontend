import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const updateRole = (newRole) => {
    setRole(newRole);
  };

  const value = {
    role,
    updateRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export default RoleContext;