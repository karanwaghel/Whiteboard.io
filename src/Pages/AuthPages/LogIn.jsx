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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/ComponentProject/Context/AuthContext";
import { toast } from "sonner";
import { commonSchema } from "@/ComponentProject/schemas/authschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


function LogInPage() {
  const { Login, LoginWithGoogle,getFirebaseErrorMessage,Loading} = useAuth();
  const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(commonSchema)})
  const nav = useNavigate();


  const FormSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      await Login(data);
      toast.success("Logged in Successfully!", {
        id: toastId,  
      });
    } catch (err) {
      console.log(err.code)
      toast.error(getFirebaseErrorMessage(err), {
        id: toastId,
      });
    }
  };

  const GoogleLogin = async () => {
    
    try {
      await LoginWithGoogle();
    } catch (err) {
      toast.error("Google login failed")
    }
  };

  return (
    <>  
      <div className=" h-screen flex justify-center items-center">
        <Card className="max-w-xl min-w-[520px]">
          <CardHeader className="flex-row items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl ">Login </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </div>
            <CardAction>
              <Button variant="link" onClick={() => nav("/signin")}>
                Sign In
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(FormSubmit)}>
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" :''}
              />
              {
                errors.email && (
                  <p className="text-sm mt-1 text-red-500 ">{errors.email.message}</p>
                )
              }
              <div className="pt-3 pb-2 grid grid-cols-2 gap-[14rem]">
                <Label className="">Password</Label>
                <Label >
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
                </Label>
              </div>
              <Input
                type="password"
                required
                {...register("password")}
                className={errors.password ? "border-red-500" :''}
              />
              {
                errors.password && (
                  <p className="text-sm mt-1 text-red-500 ">{errors.password.message}</p>
                )
                
              }
              <Button className="w-full mt-5 shadow-md" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full shadow-md" variant="outline" onClick={GoogleLogin} >
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default LogInPage;
