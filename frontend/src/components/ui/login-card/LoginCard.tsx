import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NavLink } from 'react-router';

export function LoginCard() {
  return (
    <article className="flex flex-col min-h-screen items-center justify-center">
      <h1 className='p-4 text-neutral-50 font-medium font-noto-sans'>Shadcn card, SSO anticipated with Google</h1>
      <Card className="mx-4 w-full max-w-sm font-noto-sans">
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
