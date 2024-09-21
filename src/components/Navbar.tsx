import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="flex items-center justify-between px-4">
      <div>
        <img
          src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty-500x281.png"
          alt=""
          className="w-auto h-28"
        />
      </div>
      <ul className="text-gray-100 flex items-center gap-4">
        <li>
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-primary" : ""
            } font-bold hover:text-primary transition-colors hover:cursor-pointer`}
          >
            Characters
          </Link>
        </li>
        <li>
          <Link
            to="/episode"
            className={`${
              isActive("/episode") ? "text-primary" : ""
            } font-bold hover:text-primary transition-colors hover:cursor-pointer`}
          >
            Episodes
          </Link>
        </li>
        <li>
          <Link
            to="/location"
            className={`${
              isActive("/location") ? "text-primary" : ""
            } font-bold hover:text-primary transition-colors hover:cursor-pointer`}
          >
            Locations
          </Link>
        </li>
      </ul>
    </nav>
  );
};
