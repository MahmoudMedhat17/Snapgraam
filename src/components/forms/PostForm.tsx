import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import {
  useCreatePost,
  useEditPost,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Models } from "appwrite";

interface PostFormProps {
  post?: Models.Document;
  action: "Create" | "Update";
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoading } = useCreatePost();
  const { mutateAsync: editPost, isPending: isEdited } = useEditPost();
  const { user } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    //Update post
    if (post && action === "Update") {
      const editedPost = await editPost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!editedPost) {
        toast({
          title: "Please try again",
        });
      }

      return navigate(`/posts/${post.$id}`);
    }

    //Create post
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Please try again",
      });
    }

    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-5xl w-full gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <textarea className="shad-textarea" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Add location</FormLabel>
              <FormControl>
                <Input className="shad-input rounded-[5px]" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Add Tags(seperated by commas " , ")</FormLabel>
              <FormControl>
                <Input className="shad-input rounded-[5px]" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end w-full">
          <Button
            className="shad-button_dark_4 items-center rounded-[8px]"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            className="shad-button_primary rounded-[8px]"
            type="submit"
            disabled={isLoading || isEdited}
          >
            {action === "Update" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
