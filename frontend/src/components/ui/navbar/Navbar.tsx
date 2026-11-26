import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/NavigationMenu';

import { NavLink } from 'react-router';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  //{ to: '/test', label: 'Buttons Test', end: true },
  //{ to: '/login', label: 'Login Test', end: false },
  //{ to: '/signup', label: 'Signup Test', end: false },
  { to: '/records-list-table', label: 'Records List', end: false },
] as const;

// Overrides the dark `bg-accent` states on shadcn's NavigationMenuLink: a translucent
// light violet lightens whichever point of the root's violet-900 → indigo-600 gradient
// sits behind a given link, keeping the gradient continuous.
// The active state keys off aria-current, because NavLink marks the current route with
// aria-current="page" rather than the data-active attribute the primitive styles.
const LINK_STYLES = [
  'hover:before:bg-violet-300/30',
  // Clicking a link leaves it focused, so a focus tint would look like a stuck hover:
  // clear it, and highlight only for keyboard focus.
  'focus:before:bg-transparent focus-visible:before:bg-violet-300/30',
  // The active state deliberately avoids a background tint: any tint reads as a stuck
  // hover. Indicator rails on the `after` layer (`before` is the primitive's background)
  // plus bolder text are a different kind of cue, so they can't be mistaken for hover —
  // and the two compose, leaving the active link still hoverable.
  // One pseudo-element carries both rails: inset to the link's edges with only its x
  // borders painted, so there is no need for a second layer.
  'aria-[current=page]:font-semibold aria-[current=page]:text-violet-100',
  'aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:inset-y-1',
  'aria-[current=page]:after:border-x-2 aria-[current=page]:after:border-violet-200',
].join(' ');

function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {LINKS.map(({ to, label, end }) => (
          <NavigationMenuItem key={to}>
            <NavigationMenuLink asChild className={LINK_STYLES}>
              <NavLink to={to} end={end}>
                {/* The navbar is w-fit and end-aligned in Layout, so a label growing when it turns
                    bold (active) would resize the navbar and shift it. An invisible bold copy
                    stacked in the same grid cell reserves the bold width at all times. */}
                <span className="grid">
                  <span className="col-start-1 row-start-1">{label}</span>
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
                    {label}
                  </span>
                </span>
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
