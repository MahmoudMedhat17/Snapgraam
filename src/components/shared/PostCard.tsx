import { Models } from "appwrite";

interface IPost {
  post: Models.Document;
}

const PostCard = ({ post }: IPost) => {
  return <div className="post-card"></div>;
};

export default PostCard;
