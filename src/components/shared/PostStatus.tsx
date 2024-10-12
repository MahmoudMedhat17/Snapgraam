import {
  useLikePost,
  useSavePost,
  useDeletePost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Models } from "appwrite";
import Loader from "./Loader";

interface IpostStatusProps {
  post: Models.Document;
  userId: string;
}

const PostStatus = ({ post, userId }: IpostStatusProps) => {
  const likesArray = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesArray);
  const [savedPost, setSavedPost] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaved } = useSavePost();
  const { mutate: deletePost, isPending: isDelete } = useDeletePost();
  const { data: currentUser } = useGetCurrentUser();

  console.log(post);
  console.log(savedPost);

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setSavedPost(!!savedPostRecord);
  }, [currentUser]);

  const handleLikes = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikesArray = [...likes];

    const liked = newLikesArray.includes(userId);

    if (liked) {
      newLikesArray = newLikesArray.filter((id) => id !== userId);
    } else {
      newLikesArray.push(userId);
    }

    setLikes(newLikesArray);
    likePost({ postId: post.$id, likesArray: newLikesArray });
  };

  const handleSavedPosts = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setSavedPost(false);
      return deletePost(savedPostRecord);
    } else {
      savePost({ postId: post.$id, userId: userId });
      setSavedPost(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(userId, likes) ? "icons/liked.svg" : "icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikes}
        />
        <p>{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSaved || isDelete ? (
          <Loader />
        ) : (
          <img
            src={savedPost ? "icons/saved.svg" : "icons/save.svg"}
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavedPosts}
          />
        )}
      </div>
    </div>
  );
};

export default PostStatus;
