import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/shadcn/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@repo/ui/components/shadcn/field";
import { Input } from "@repo/ui/components/shadcn/input";
import { cn } from "@repo/ui/lib/utils";
import { ROUTES } from "@/configs/constanst";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // Get token from URL query parameters
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      toast.error("Invalid or missing reset token");
      navigate(ROUTES.forgotPassword);
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    try {
      const { data: authData, error } = await authClient.resetPassword({ newPassword: data.password, token });

      if (error) {
        toast.error(error.message || "Failed to reset password");
        return;
      }

      if (authData) {
        setIsSuccess(true);
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate(ROUTES.login);
        }, 2000);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Reset password error:", err);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Set new password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {isSuccess
              ? "Your password has been reset successfully. Redirecting to login..."
              : "Enter your new password below"}
          </p>
        </div>
        {!isSuccess && (
          <>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isSubmitting}
              />
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </Field>
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting password..." : "Reset password"}
              </Button>
            </Field>
          </>
        )}
        <Field>
          <FieldDescription className="text-center">
            Remember your password?{" "}
            <a href={ROUTES.login} className="underline underline-offset-4">
              Back to login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
