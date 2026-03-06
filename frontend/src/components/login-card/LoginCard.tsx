import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

//import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

export function LoginCard() {
  return (
    <Card className="mx-4 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Login with Google to access your account</CardDescription>
        <CardAction>
          <NavLink to="/signup">
            <Button variant="link">Sign Up</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {/*<div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>*/}

            {/* 
             <div className="grid gap-2">
             <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/*<Button type="submit" className="w-full">
          Login
        </Button>*/}
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
