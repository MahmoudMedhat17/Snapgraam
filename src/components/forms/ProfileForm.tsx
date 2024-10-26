"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileUploadValidation } from "@/lib/validation";
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
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserById,
  useGetUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/AuthProvider";
import ProfileUploader from "../shared/ProfileUploader";
import Loader from "../shared/Loader";
import { Textarea } from "../ui/textarea";

const ProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUserQuery, isPending } = useGetUpdateUser();
  const { user, setUser } = useUserContext();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileUploadValidation>>({
    resolver: zodResolver(ProfileUploadValidation),
    defaultValues: {
      userName: user.userName,
      name: user.name,
      bio: user.bio,
      email: user.email,
    },
  });

  if (!currentUser) {
    <div className="h-full w-full text-center">
      <Loader />
    </div>;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileUploadValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const updateUser = await updateUserQuery({
      userId: currentUser?.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageId: currentUser?.imageId,
      imageUrl: currentUser?.imageUrl,
    });

    if (!updateUser) {
      toast({
        title: "Updated user failed, please try again",
      });
    }

    setUser({
      ...user,
      name: updateUser?.name,
      bio: updateUser?.bio,
      imageUrl: updateUser?.imageUrl,
    });

    return navigate(`/profile/${id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-5xl gap-4"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={currentUser?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-xl"
                  placeholder="Mahmoud-medhat"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={() => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-xl"
                  placeholder="@mahmoud-medhat"
                  disabled
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-xl"
                  placeholder="mahmoud.medhat-17@gmail.com"
                  disabled
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary-600 hover:bg-primary-500 duration-200 rounded-[8px] px-6 mt-10"
          >
            {isPending && <Loader />}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
