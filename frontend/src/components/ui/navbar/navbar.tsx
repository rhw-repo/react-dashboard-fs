import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import { NavLink } from 'react-router';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/test', label: 'Test', end: true },
  { to: '/login', label: 'Login Test', end: false },
  { to: '/link-four', label: 'Link Four', end: false },
] as const;

function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {LINKS.map(({ to, label, end }) => (
          <NavigationMenuItem key={to}>
            <NavigationMenuLink asChild>
              <NavLink to={to} end={end}>
                {label}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
