import { useParams, Link } from "react-router-dom";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthProvider";
import PostStatus from "@/components/shared/PostStatus";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDelete = () => {};

  return (
    <div className="post_details-container">
      {isPending || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`profile/${post?.creator.$id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      post?.creator.imageUrl || "icons/profile-placeholder.svg"
                    }
                    alt="profilePic"
                    className="w-12 lg:h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-light-1">{post?.creator.userName}</p>
                    <div className="flex-center gap-3 text-light-3">
                      <p className="subtle-semibold lg:small-regular">
                        {timeAgo(post?.$createdAt)}
                      </p>
                      {"-"}
                      <p className="subtle-semibold lg:small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  to={`update-post/${post?.$id}`}
                  className={`${user.id !== post.creator.$id && "hidden"}`}
                >
                  <img src="/icons/edit.svg" width={24} height={24} />
                </Link>
                <Button
                  onClick={handleDelete}
                  className={`${user.id !== post.creator.$id && "hidden"}`}
                >
                  <img src="/icons/delete.svg" width={24} height={24} />
                </Button>
              </div>
            </div>
            <hr className="border border-1 border-dark-4/80 w-full" />
            <div>
              <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                <p>{post.caption}</p>
                <ul className="mt-2 text-light-3">
                  {post.tags.map((tag: string, index: string) => (
                    <li key={index} className="small-regular">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full">
              <PostStatus post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
