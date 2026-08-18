import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div
      className="flex min-h-screen transition-colors duration-250"
      style={{ color: "var(--text-color)" }}
    >
      <aside
        className={`
          w-64 p-6 flex flex-col
          border-r
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-all duration-300 ease-in-out
          md:translate-x-0
        `}
        style={{
          backgroundColor: "var(--bg-color)",
          borderColor: "var(--preview-border)",
        }}
      >
        <h2 className="text-md font-bold mb-6">Components</h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => (
            <li
              onClick={() => navigate(item.toLowerCase())}
              key={item}
              className={`cursor-pointer text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${
                location.pathname === `/components/${item.toLowerCase()}`
                  ? "font-semibold opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 ml-10 overflow-auto h-screen p-6">
        <button
          className="md:hidden mb-4 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
