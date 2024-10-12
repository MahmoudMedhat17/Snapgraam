import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
import { useUserContext } from "@/context/AuthProvider";
import PostStatus from "./PostStatus";

interface IPost {
  post: Models.Document;
}

const PostCard = ({ post }: IPost) => {
  const { user } = useUserContext();

  // const monthNames = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // const date = new Date();
  // const day = date.getDate();
  // const month = monthNames[date.getMonth() - 1];
  // const year = date.getFullYear();
  // const time = date.toLocaleString("en-us", {
  //   hour: "numeric",
  //   minute: "2-digit",
  //   hour12: true,
  // });


  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post.creator.imageUrl || "icons/profile-placeholder.svg"}
              alt="profilePic"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-light-1">{post.creator.userName}</p>
            <div className="flex-center gap-3 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {timeAgo(post.$createdAt)}
              </p>
              {"-"}
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        {/* Update icon to update the post and check if it's the creator of the post or a random user */}
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="icons/edit.svg" alt="editIcon" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="mt-2 text-light-3">
            {post.tags.map((tag: string, index: string) => (
              <li key={index} className="small-regular">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {/* Image of the post */}
        <img src={post.imageUrl} alt="postImage" className="post-card_img" />
      </Link>
      <PostStatus post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
