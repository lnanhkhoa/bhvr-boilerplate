import { Navigate } from "react-router";
import { Spinner } from "@repo/ui/components/shadcn/spinner";
import { ROUTES } from "@/configs/constanst";
import { authClient } from "@/lib/auth-client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!session) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
}
