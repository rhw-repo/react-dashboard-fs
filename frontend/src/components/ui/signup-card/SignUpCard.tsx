import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

export default function SignupCard() {
  return (
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
  );
}
