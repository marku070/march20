import { NavLink as RouterNavLink } from "react-router-dom";
import { Home, Image, Mail } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/letters", label: "Letters", icon: Mail },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1 sm:gap-8 py-3 px-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <RouterNavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </RouterNavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
