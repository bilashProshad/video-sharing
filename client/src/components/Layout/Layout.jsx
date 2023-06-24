import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";

const Layout = () => {
  const [expandSidebar, setExpandSidebar] = useState(true);

  function expandSidebarHandler() {
    setExpandSidebar(!expandSidebar);
  }

  return (
    <>
      <Navbar onExpandSidebar={expandSidebarHandler} />
      <div className="layout">
        <Sidebar expand={expandSidebar} />
      </div>
    </>
  );
};

export default Layout;
