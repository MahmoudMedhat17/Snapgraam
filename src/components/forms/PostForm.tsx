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
import { FileUploaderValidation } from "@/lib/validation";

const PostForm = ({ post }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof FileUploaderValidation>>({
    resolver: zodResolver(FileUploaderValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags : "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FileUploaderValidation>) {
    console.log(values);
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
      </form>
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
        >
          Cancel
        </Button>
        <Button className="shad-button_primary rounded-[8px]" type="submit">
          Create Post
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
