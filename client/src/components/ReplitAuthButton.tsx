import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function ReplitAuthButton() {
  const { loginWithReplit } = useAuth();

  return (
    <Button
      onClick={loginWithReplit}
      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
      data-testid="button-replit-login"
    >
      Login with Replit
    </Button>
  );
}
