import { Card, CardContent } from '@/components/ui/card';

export function ChartsSection() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Work Chart */}
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Total Work</h3>
            <select className="text-xs border rounded px-2 py-1 text-gray-600">
              <option>6 month</option>
              <option>3 month</option>
              <option>1 month</option>
            </select>
          </div>

          <span className="text-xs text-gray-500 mb-2 block">Tasks</span>

          <div className="h-[180px] relative">
            <svg
              className="w-full h-full"
              viewBox="0 0 300 120"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points="0,80 30,70 60,85 90,60 120,75 150,55 180,45 210,90 240,70 270,85 300,80"
              />
              <polyline
                fill="url(#gradient)"
                opacity="0.3"
                points="0,80 30,70 60,85 90,60 120,75 150,55 180,45 210,90 240,70 270,85 300,80 300,120 0,120"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Percentage */}
      <Card className="w-full">
        <CardContent className="p-4">
          <h3 className="text-sm font-bold mb-4">Task Percentage</h3>

          <div className="flex items-center justify-center gap-8 h-[180px]">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray="314"
                  strokeDashoffset="78.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="12"
                  strokeDasharray="314"
                  strokeDashoffset="157"
                  strokeLinecap="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="12"
                  strokeDasharray="314"
                  strokeDashoffset="235.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500" />
                <span>Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Total</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
