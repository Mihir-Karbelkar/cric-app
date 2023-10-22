import { ThemeToggle } from './theme-toggle';
import { Button } from '../components/ui/button';
import Link from '../components/ui/link';

export function MainNav() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-4 items-center">
          <Button variant={'secondary'}>Cric App</Button>
          <Link href={'/cricketers'} className="">
            Crickters
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
