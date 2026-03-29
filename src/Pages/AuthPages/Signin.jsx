import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/ComponentProject/Context/AuthContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commonSchema } from "@/ComponentProject/schemas/authschema";

function SignIn() {
  const {SignIn, getFirebaseErrorMessage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:zodResolver(commonSchema)});
  const nav = useNavigate();


  const FormSubmit = async (data) => {
    const toastId = toast.loading("Signing in...");
    try {
      await SignIn(data);
      toast.success("Sign in Successfully!", {
        id: toastId,
      });
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err), {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div className=" h-screen flex justify-center items-center ">
        <Card className="max-w-xl min-w-[520px] ">
          <CardHeader className="flex-row items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl ">Sign up </CardTitle>
              <CardDescription>
                Enter your email below to Create an account!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(FormSubmit)}>
              <Label>Email</Label>
              <Input
                type="email"
                required
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.email.message}
                </p>
              )}
              <div className="py-2">
                <Label className="mr-[22rem]">Password</Label>
                <Input
                  type="password"
                  required
                  {...register("password")}
                  className={errors.email ? "red-border-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button className="w-full mt-6" type="submit">
                Continue
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <CardAction className="mx-auto">
              <CardDescription>Already have an Account?</CardDescription>
              <Button
                variant="link"
                className="pl-0"
                onClick={() => nav("/login")}
              >
                Log In
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
