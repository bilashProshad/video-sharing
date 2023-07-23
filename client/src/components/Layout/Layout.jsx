import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";
import SidebarSlider from "../SidebarSlider/SidebarSlider";
import BottomNav from "../BottomNav/BottomNav";

const Layout = ({
  children,
  showSidebar = true,
  showSidebarSlider = false,
  expand = true,
  className,
}) => {
  const [expandSidebar, setExpandSidebar] = useState(expand);

  function expandSidebarHandler() {
    setExpandSidebar(!expandSidebar);
  }

  return (
    <>
      <Navbar onExpandSidebar={expandSidebarHandler} />
      <div className={`layout ${className}`}>
        {showSidebar && <Sidebar expand={expandSidebar} />}

        <SidebarSlider
          expand={!expandSidebar}
          onClose={expandSidebarHandler}
          showLargeScreen={showSidebarSlider}
        />

        <BottomNav />
        <div className="main">{children}</div>
      </div>
    </>
  );
};

export default Layout;
