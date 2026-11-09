function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border-line p-5 shadow-card min-h-screen">
      <h2 className="text-lg font-bold text-text-main mb-4">Sidebar</h2>
      <ul className="flex flex-col gap-2">
        <li>
          <a
            href="#home"
            className="flex items-center px-3 py-2 rounded-btn text-sm font-medium text-text-main hover:bg-primary-light hover:text-primary transition"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="flex items-center px-3 py-2 rounded-btn text-sm font-medium text-text-muted hover:bg-primary-light hover:text-primary transition"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="flex items-center px-3 py-2 rounded-btn text-sm font-medium text-text-muted hover:bg-primary-light hover:text-primary transition"
          >
            Contact
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
