import { useUserContext } from "@/context/AuthProvider";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStatus from "./PostStatus";

type PostsProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStatus?: boolean;
};

const GridPosts = ({
  posts,
  showUser = true,
  showStatus = true,
}: PostsProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post?.$id}`} className="grid-post_link">
            <img src={post.imageUrl} className="h-full w-full object-cover" />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl || "/icons/profile-placeholder.svg"
                  }
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.userName}</p>
              </div>
            )}

            {showStatus && <PostStatus post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPosts;
