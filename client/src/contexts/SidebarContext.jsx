import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  activeLink: "home",
  setActiveLink: () => {},
});

const useSidebarContext = () => {
  return useContext(SidebarContext);
};

const SidebarProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("");

  const value = {
    activeLink,
    setActiveLink,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export { SidebarProvider, useSidebarContext };
