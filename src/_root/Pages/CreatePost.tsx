import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex gap-3 flex-start w-full">
          <img src="icons/add-post.svg" alt="createPost" />
          <p className="h3-bold md:h2-bold">Create Post</p>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
