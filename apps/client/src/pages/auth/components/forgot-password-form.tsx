import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/shadcn/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@repo/ui/components/shadcn/field";
import { Input } from "@repo/ui/components/shadcn/input";
import { cn } from "@repo/ui/lib/utils";
import { ROUTES } from "@/configs/constanst";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const { data: authData, error } = await authClient.forgetPassword({
        email: data.email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message || "Failed to send reset link");
        return;
      }

      if (authData) {
        setIsSuccess(true);
        toast.success("Password reset link sent! Check your email.");
        reset();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Forgot password error:", err);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {isSuccess
              ? "We've sent a password reset link to your email address"
              : "Enter your email address and we'll send you a link to reset your password"}
          </p>
        </div>
        {!isSuccess && (
          <>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </Field>
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send reset link"}
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
