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
import { useNavigate, useLocation } from 'react-router-dom';

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/v2' },
    { icon: Focus, label: 'Focus', path: '/v2/focus' },
    { icon: List, label: 'Tasks', path: '/v2/tasks' },
    { icon: MessageCircle, label: 'Chat', path: '/v2/chat' },
    { icon: Calendar, label: 'Schedule', path: '/v2/schedule' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/v2/settings' },
    { icon: User, label: 'User', path: '/v2/profile' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX ACTIVE LOGIC
  const isActive = (path: string) => {
    if (path === '/v2') {
      return location.pathname === '/v2';
    }
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  // ✅ FIX HOVER COLOR
  const baseItemClass =
    'justify-start gap-3 h-12 text-gray-400 hover:text-black';

  const activeItemClass =
    'bg-primary-900 text-primary-foreground hover:bg-primary-900 hover:text-primary-foreground';

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Toggle */}
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

      {/* Top */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 p-6 pb-4">
          <Heart className="h-8 w-8 flex-shrink-0 fill-gray-500 text-gray-500" />
          {!isCollapsed && <span className="text-2xl font-bold">Logo</span>}
        </div>

        {/* MAIN NAV */}
        <nav className="flex flex-col gap-2 px-3">
          {mainNavItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  baseItemClass,
                  isCollapsed ? 'px-3 justify-center' : 'px-4',
                  active && activeItemClass
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

      {/* BOTTOM NAV */}
      <div className="flex flex-col gap-2 p-3 pb-6">
        {bottomNavItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                baseItemClass,
                isCollapsed ? 'px-3 justify-center' : 'px-4',
                active && activeItemClass
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
