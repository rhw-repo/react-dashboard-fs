import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NavLink } from 'react-router';

export default function SignupCard() {
  return (
    <article className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-noto-sans p-4 font-medium text-neutral-50">Shadcn card, SSO anticipated with Google</h1>
      <Card className="mx-4 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup for an account</CardTitle>
          <CardDescription>Use Login if you have an account</CardDescription>
          <CardAction>
            <NavLink to="/login">
              <Button variant="link">Login</Button>
            </NavLink>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Signup with Google
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
