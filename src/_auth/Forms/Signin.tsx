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
import { SigninValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Signin = () => {
  const { toast } = useToast();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { isLoading, checkUserAuth } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(users: z.infer<typeof SigninValidation>) {
    try {
      const session = await signInAccount({
        email: users.email,
        password: users.password,
      });
      if (!session) {
        toast({ title: "Login failed, please try again" });
      }

      const isLogged = await checkUserAuth();
      if (!isLogged) {
        toast({ title: "Login failed, please try again" });
      } else {
        navigate("/");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
    console.log(users);
  }

  return (
    <Form {...form}>
      <div className=" flex-center flex-col">
        <img src="images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input rounded-[8px]"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message " />
              </FormItem>
            )}
          />
          <Button
            className="shad-button_primary flex justify-center items-center rounded-[8px]"
            type="submit"
          >
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
        <p className="text-light-2 text-center mt-6">
          Don't have an account?{" "}
          <Link
            className="text-primary-500 ml-1 text-small-semibold"
            to="/signup"
          >
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default Signin;
