import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: "🏠",
    testId: "nav-dashboard",
  },
  {
    label: "Projects",
    path: "/projects",
    icon: "📁",
    testId: "nav-projects",
  },
  {
    label: "Tests",
    path: "/tests",
    icon: "🧪",
    testId: "nav-tests",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "⚙️",
    testId: "nav-settings",
  },
];

export default function Sidebar() {
  return (
    <aside
      className="app-sidebar"
      data-test="layout-sidebar"
    >
      <nav>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                data-test={item.testId}
                style={{
                  display: "block",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
