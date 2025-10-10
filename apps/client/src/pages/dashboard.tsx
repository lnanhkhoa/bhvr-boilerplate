import beaver from "@/assets/beaver.svg";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/components/shadcn/card";
import { UserMenu } from "@/components/user-menu";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={beaver} className="h-8 w-8" alt="beaver logo" />
            <h1 className="text-xl font-bold">BHVR Dashboard</h1>
          </div>
          <UserMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome back, {session?.user?.name || "User"}! 🦫</h2>
          <p className="text-muted-foreground mt-2">
            You're now in a protected area. This page is only accessible to authenticated users.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-muted-foreground text-sm">{session?.user?.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email Verified</p>
                  <p className="text-muted-foreground text-sm">
                    {session?.user?.emailVerified ? "Yes ✓" : "No ✗"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Info</CardTitle>
              <CardDescription>Your current session details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Session ID</p>
                  <p className="text-muted-foreground truncate text-sm">{session?.session?.id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expires At</p>
                  <p className="text-muted-foreground text-sm">
                    {session?.session?.expiresAt
                      ? new Date(session.session.expiresAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Build something amazing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This is a protected dashboard page. You can now build your application with the peace of mind that
                comes from secure authentication. 🦫
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
