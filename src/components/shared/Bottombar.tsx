import { sidebarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {sidebarLinks.map((link, index) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={index}
            to={link.route}
            className={`flex-center flex-col gap-1 p-2 transition group ${
              isActive && "bg-primary-500 rounded-[10px]"
            }`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${
                isActive && "group-hover:invert-white invert-white"
              }`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};
export default Bottombar;
