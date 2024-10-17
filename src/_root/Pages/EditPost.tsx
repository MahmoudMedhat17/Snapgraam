import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import PostForm from "@/components/forms/PostForm";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post } = useGetPostById(id || "");

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex gap-3 flex-start w-full">
          <img src="/icons/edit.svg" alt="EditPost" />
          <p className="h3-bold md:h2-bold">Edit Post</p>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
