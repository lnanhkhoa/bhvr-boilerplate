import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/shadcn/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@repo/ui/components/shadcn/field";
import { Input } from "@repo/ui/components/shadcn/input";
import { ROUTES } from "@/configs/constanst";
import { authClient } from "@/lib/auth-client";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { data: authData, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (authData) {
        toast.success("Account created successfully!");
        navigate(ROUTES.dashboard);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Signup error:", err);
    }
  };

  const handleGitHubSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: ROUTES.dashboard,
      });
    } catch (err) {
      toast.error("Failed to sign up with GitHub");
      console.error("GitHub signup error:", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">BHVR Creative.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to BHVR Creative.</h1>
            <FieldDescription>
              Already have an account? <a href={ROUTES.login}>Sign in</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" {...register("name")} disabled={isSubmitting} />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} disabled={isSubmitting} />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} disabled={isSubmitting} />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
          </Field>
          <Field>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-1">
            <Button variant="outline" type="button" onClick={handleGitHubSignup} disabled={isSubmitting}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Continue with GitHub
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
