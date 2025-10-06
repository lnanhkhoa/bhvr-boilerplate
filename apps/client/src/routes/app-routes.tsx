import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { Spinner } from "@repo/ui/components/shadcn/spinner";
import { ROUTES } from "../configs/constanst";

const HomePage = lazy(() => import("../pages/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const SignupPage = lazy(() => import("../pages/auth/signup"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/forgot-password"));
const OTPPage = lazy(() => import("../pages/auth/otp"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignupPage />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.otp} element={<OTPPage />} />
      </Routes>
    </Suspense>
  );
}
