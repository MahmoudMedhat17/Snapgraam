import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateNewUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthProvider";

const Signup = () => {
  const { toast } = useToast();
  const { mutateAsync: createNewUserAccount, isPending } =
    useCreateNewUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { isLoading: isUserLoading, checkUserAuth } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(users: z.infer<typeof SignupValidation>) {
    const newUser = await createNewUserAccount(users);

    // If user not found, show a toast with title
    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Sign up failed, please try again",
      });
    }

    const session = await signInAccount({
      email: users.email,
      password: users.password,
    });

    // If session not found, show a toast with title
    if (!session) {
      return toast({
        title: "Sign in failed, please try again",
      });
    }

    const isLogged = await checkUserAuth();

    if (isLogged) {
      navigate("/home");
    } else {
      return toast({
        variant: "destructive",
        title: "Sign in failed, please try again",
      });
    };

    console.log(newUser);
  };

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <img src="images/logo.svg" alt="logo" />
        <h2 className="pt-5 sm:pt-6 h3-bold md:h2-bold">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="shad-button_primary w-full rounded-[8px]"
          >
            {isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
        <p className="mt-6 text-small-regular text-light-2 text-center">
          Already have an account?
          <Link
            to="/signin"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default Signup;
