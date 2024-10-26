import Loader from "@/components/shared/Loader";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useParams, useLocation, Link } from "react-router-dom";
import Likedposts from "./Likedposts";
import Statesblock from "./Statesblock";
import { useUserContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { data: currentUser } = useGetUserById(id || "");
  const { user } = useUserContext();

  return (
    <>
      {!currentUser ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-inner_container">
            <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
              <img
                src={currentUser?.imageUrl || "/icons/profile-placeholder.svg"}
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
              />
              <div className="flex flex-col flex-1 justify-between md:mt-2">
                <div className="flex flex-col w-full">
                  <h3 className="h2-bold md:h1-semibold text-center xl:text-left w-full">
                    {currentUser?.userName}
                  </h3>
                  <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                    @{currentUser?.userName}
                  </p>
                </div>
              </div>
              <Link
                to={`/update-profile/${currentUser?.$id}`}
                className={`${user.id !== currentUser.$id && "hidden"}`}
              >
                <div className="flex items-center bg-dark-4 px-4 rounded-xl">
                  <img
                    src="/icons/edit.svg"
                    width={20}
                    height={20}
                    className="invert-white"
                  />
                  <Button className="flex whitespace-nowrap small-medium">
                    Edit Profile
                  </Button>
                </div>
              </Link>
              <Link to={"/"} className={`${user.id === id && "hidden"}`}>
                <Button
                  type="button"
                  className="bg-primary-600 hover:bg-primary-500 duration-200 text-white px-4 rounded-xl"
                >
                  Follow
                </Button>
              </Link>
            </div>
          </div>
          <Statesblock value={20} label="Followers" />
          <div className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
            {currentUser?.bio}
          </div>

          {currentUser.$id === user.id && (
            <div className="flex w-full max-w-5xl gap-4 md:gap-8">
              <Link
                to={`/profile/${id}`}
                className={`profile-tab rounded-xl ${
                  pathname === `/profile/${id}` && "!bg-dark-3"
                }`}
              >
                <img src="/icons/posts.svg" width={20} height={20} />
                Posts
              </Link>
              <Link
                to={`/profile/${id}/liked-posts`}
                className={`profile-tab rounded-xl ${
                  pathname === `/profile/${id}` && "!bg-dark-3"
                }`}
              >
                <img src="/icons/like.svg" width={20} height={20} />
                Liked posts
              </Link>
              <div className="w-full hidden xl:flex justify-end">
                <div className="flex items-center gap-2 cursor-pointer">
                  <p>All</p>
                  <img src="/icons/filter.svg" width={30} height={30} />
                </div>
              </div>
            </div>
          )}

          <Likedposts />
        </div>
      )}
    </>
  );
};

export default Profile;
