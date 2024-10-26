import Topbar from "@/components/shared/Topbar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Bottombar from "@/components/shared/Bottombar";
import Rightbar from "@/components/shared/Rightbar";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <Leftsidebar />
      <section className="h-full flex flex-1">
        <Outlet />
      </section>
      <Bottombar />
      <Rightbar />
    </div>
  );
};

export default Rootlayout;
