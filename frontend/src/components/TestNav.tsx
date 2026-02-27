import * as React from 'react';

export function FakeNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-50">
      {/* Fake navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-neutral-800" />
            <span className="text-sm font-medium">FakeNav</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-neutral-300 sm:flex">
            <a className="hover:text-neutral-50" href="#">
              Dashboard
            </a>
            <a className="hover:text-neutral-50" href="#">
              Reports
            </a>
            <a className="hover:text-neutral-50" href="#">
              Settings
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs hover:bg-neutral-900">
              Log in
            </button>
            <button className="rounded-md bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 hover:bg-neutral-200">
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 rounded-md border border-neutral-800 bg-neutral-900/40 p-3 text-sm text-neutral-300">
          Swipe test: the page should scroll vertically as normal. Only the table container should pan horizontally.
        </div>

        {/* Your table (or any children) goes here */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">{children}</div>

        {/* Extra content to ensure vertical scroll */}
        <div className="mt-8 space-y-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-12 rounded-md border border-neutral-800 bg-neutral-900/30" />
          ))}
        </div>
      </main>
    </div>
  );
}
