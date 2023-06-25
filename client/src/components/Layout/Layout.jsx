import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";
import SidebarSlider from "../SidebarSlider/SidebarSlider";

const Layout = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState(true);

  function expandSidebarHandler() {
    setExpandSidebar(!expandSidebar);
  }

  return (
    <>
      <Navbar onExpandSidebar={expandSidebarHandler} />
      <div className="layout">
        <Sidebar expand={expandSidebar} />
        <SidebarSlider expand={expandSidebar} onClose={expandSidebarHandler} />
        <div className="main">{children}</div>
      </div>
    </>
  );
};

export default Layout;
