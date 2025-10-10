import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/shadcn/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@repo/ui/components/shadcn/field";
import { Input } from "@repo/ui/components/shadcn/input";
import { cn } from "@repo/ui/lib/utils";
import { ROUTES } from "@/configs/constanst";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { APP_BASE_URL } from "@/configs/env";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: authData, error } = await authClient.signIn.email(
        { email: data.email, password: data.password },
        {
          onSuccess(context) {
            const authToken = context.response.headers.get("Set-Auth-Token");
            if (authToken) localStorage.setItem("authToken", authToken);
          },
        },
      );

      if (error) {
        toast.error(error.message || "Failed to login");
        return;
      }

      if (authData) {
        toast.success("Login successful!");
        navigate(ROUTES.dashboard);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Login error:", err);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await authClient.signIn.social({ provider: "github", callbackURL: `${APP_BASE_URL}/dashboard` });
    } catch (err) {
      toast.error("Failed to login with GitHub");
      console.error("GitHub login error:", err);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} disabled={isSubmitting} />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href={ROUTES.forgotPassword} className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} disabled={isSubmitting} />
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" onClick={handleGitHubLogin} disabled={isSubmitting}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href={ROUTES.signup} className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
