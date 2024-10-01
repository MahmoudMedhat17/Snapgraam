import { Outlet, Navigate } from "react-router-dom";

const Authlayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <section className="flex flex-1 flex-col justify-center items-center">
            {/* Outlet renders the parent route which is home here or the children inside it which are SignUp and SignIn forms */}
            <Outlet />
          </section>
          <img
            src="images/side-img.svg"
            className="hidden xl:block w-1/2 h-screen bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default Authlayout;
