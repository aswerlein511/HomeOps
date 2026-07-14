import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="app-layout" data-test="layout-main">
      <Header />

      <Sidebar />

      <main
        className="app-main"
        data-test="layout-content"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
