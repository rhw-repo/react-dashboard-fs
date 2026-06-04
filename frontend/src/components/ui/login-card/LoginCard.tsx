import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NavLink } from 'react-router';

export function LoginCard() {
  return (
    <article className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-noto-sans p-4 font-medium text-neutral-50">Shadcn card, SSO anticipated with Google</h1>
      <Card className="font-noto-sans mx-4 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Login with Google to access your account</CardDescription>
          <CardAction>
            <NavLink to="/signup">
              <Button variant="link">Sign Up</Button>
            </NavLink>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
