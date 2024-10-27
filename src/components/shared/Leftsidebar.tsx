import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";

const Leftsidebar = () => {
  const { user } = useUserContext();
  const { mutateAsync: signOut } = useSignOutAccount();
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/">
          <img src="images/logo.svg" alt="logo" width={170} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "icons/profile-placeholder.svg"}
            alt="user-img"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.userName}</p>
            <p className="text-light-3 small-regular">@{user.userName}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={index}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink to={link.route} className="flex gap-3 p-3">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${
                      isActive && "invert-white group-hover:invert-white "
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        onClick={() => signOut}
        className="shad-button_ghost"
      >
        <Link to="/signin" className="flex gap-5">
          <img src="icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Link>
      </Button>
    </nav>
  );
};

export default Leftsidebar;
