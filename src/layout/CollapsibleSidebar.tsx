import * as React from 'react';
import {
  Heart,
  Home,
  Focus,
  List,
  MessageCircle,
  Calendar,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const mainNavItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Focus, label: 'Focus', active: false },
    { icon: List, label: 'Tasks', active: false },
    { icon: MessageCircle, label: 'Chat', active: false },
    { icon: Calendar, label: 'Schedule', active: false },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings' },
    { icon: User, label: 'User' },
  ];

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-7 z-10 h-6 w-6 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 p-6 pb-4">
          <Heart className="h-8 w-8 flex-shrink-0 fill-gray-500 text-gray-500" />
          {!isCollapsed && <span className="text-2xl font-bold">Logo</span>}
        </div>

        <nav className="flex flex-col gap-2 px-3">
          {mainNavItems.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={item.active ? 'default' : 'ghost'}
                className={cn(
                  'justify-start gap-3 h-12 text-gray-400',
                  isCollapsed ? 'px-3 justify-center' : 'px-4',
                  item.active &&
                    'bg-primary-900 text-primary-foreground hover:bg-primary-900'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-base">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 p-3 pb-6">
        {bottomNavItems.map(item => {
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                'justify-start gap-3 h-12 text-gray-400 inline-flex',
                isCollapsed ? 'px-3 justify-start' : 'px-4'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-base">{item.label}</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
