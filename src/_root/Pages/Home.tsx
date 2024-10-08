import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import PostCard from "@/components/shared/PostCard";

const Home = () => {
  const { data: posts, isLoading, isError } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h3 className="h2-bold md:h3-bold text-left w-full">Home Feed</h3>
          {isLoading && !posts ? (
            <Loader />
          ) : (
            <>
              <ul className="flex flex-col flex-1 w-full gap-9">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard post={post} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
