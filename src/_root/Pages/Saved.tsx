import GridPosts from "@/components/shared/GridPosts";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: posts } = useGetCurrentUser();

  const userSavedPosts = posts?.save.map((savedPosts: Models.Document) => {
    return {
      ...savedPosts.posts,
      creator: {
        imageUrl: posts.imageUrl,
      },
    };
  });

  return (
    <div className="saved-container">
      <div className="w-full flex items-center gap-3">
        <img src="/icons/save.svg" width={36} height={36} />
        <h3 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h3>
      </div>
      <div className="w-full flex-between">
        <div className="flex items-center gap-3 bg-dark-4 px-8 py-2 rounded-xl cursor-pointer">
          <img src="/icons/posts.svg" height={24} width={24} />
          <p>Posts</p>
        </div>
        <div className="flex-center gap-3 bg-dark-3 p-4 rounded-xl cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/icons/filter.svg" width={24} height={24} />
        </div>
      </div>
      {!userSavedPosts ? (
        <Loader />
      ) : (
        <ul className="w-full max-w-5xl flex justify-center gap-9">
          {userSavedPosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPosts posts={userSavedPosts} showStatus={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
