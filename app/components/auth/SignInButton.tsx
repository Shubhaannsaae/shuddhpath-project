'use client';

import { useArcGIS } from '@/hooks/useArcGIS';
import { Button } from '@/components/ui/Button';

export default function SignInButton() {
  const { isAuthenticated, portal, loading, signIn, signOut } = useArcGIS();

  if (loading) {
    return <Button disabled>Loading...</Button>;
  }

  if (isAuthenticated && portal?.user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Welcome, {portal.user.fullName}
        </span>
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn}>
      Sign In with ArcGIS
    </Button>
  );
}
