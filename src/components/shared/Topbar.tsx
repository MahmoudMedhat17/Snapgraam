import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthProvider";
import { useEffect } from "react";

const Topbar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link to="/">
          <img src="images/logo.svg" alt="logo" width={130} height={325} />
        </Link>
        <div className="flex gap-4 items-center">
          <Button onClick={() => signOut}>
            <Link to="/signin">
              <img src="icons/logout.svg" alt="logout" />
            </Link>
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "icons/profile-placeholder.svg"}
              alt="user-logo"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
