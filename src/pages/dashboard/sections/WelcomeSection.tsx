import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WelcomeSection() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">Welcome To</p>

              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-xl text-gray-900">
                  Your Task Management Area
                </h2>
                <p className="text-xs text-gray-500">
                  Track all your tasks in one place
                </p>
              </div>
            </div>

            <Button className="mt-2 w-fit rounded-full bg-violet-600 px-6 py-2 text-sm text-white hover:bg-violet-700">
              Learn More
            </Button>
          </div>

          <div className="h-[140px] w-[140px] shrink-0 flex items-center justify-center bg-violet-50 rounded-2xl">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Illustration placeholder */}
              <rect
                x="20"
                y="20"
                width="80"
                height="80"
                rx="8"
                fill="#DDD6FE"
              />
              <rect x="30" y="40" width="60" height="4" rx="2" fill="#8B5CF6" />
              <rect x="30" y="50" width="45" height="4" rx="2" fill="#A78BFA" />
              <rect x="30" y="60" width="50" height="4" rx="2" fill="#C4B5FD" />
              <circle cx="85" cy="75" r="15" fill="#8B5CF6" opacity="0.3" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
