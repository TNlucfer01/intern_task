import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/dashboard", label: "Dashboard", end: false },
];

function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border-line bg-card p-5 shadow-card md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <h2 className="mb-4 text-lg font-bold text-text-main">Task Tracker</h2>
      <nav aria-label="Main navigation">
        <ul className="flex gap-2 md:flex-col">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center rounded-btn px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text-muted hover:bg-primary-light hover:text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
