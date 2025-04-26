import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <MenuContext.Provider
      value={{ openMenu, setOpenMenu, activeTab, setActiveTab }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
