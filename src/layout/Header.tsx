import { Bell, ChevronDown, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type HeaderProps = {
  user?: {
    name: string;
    role?: string;
    avatar?: string;
  };
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between gap-3 py-2">
          <div className="relative w-full max-w-xl">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 rounded-full bg-white"
              aria-label="Search tasks"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="size-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" className="h-auto px-2 py-1 rounded-full">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-sm font-medium">
                    {user?.name ?? 'Guest'}
                  </span>
                  {user?.role && (
                    <span className="text-xs text-slate-500">{user.role}</span>
                  )}
                </div>

                <ChevronDown className="size-4 text-slate-500" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
