import GridPosts from "@/components/shared/GridPosts";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const Likedposts = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <>
      {!currentUser ? (
        <Loader />
      ) : (
        <div>
          {currentUser.posts.length === 0 ? (
            <p>No available Posts</p>
          ) : (
            <GridPosts
              posts={currentUser?.posts}
              showStatus={false}
              showUser={false}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Likedposts;
