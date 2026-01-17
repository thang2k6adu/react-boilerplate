import { Layout } from '../layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ListChecks,
  CalendarCheck2,
  Timer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React from 'react';

type StatCardProps = {
  value: number | string;
  label: string;
  Icon?: React.ElementType;
};

function StatCard({ value, label, Icon = CheckCircle2 }: StatCardProps) {
  return (
    <Card className="w-full border-0 bg-violet-500 text-white shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[23px] leading-[30px] font-normal">
              {value}
            </span>
            <span className="text-[13px] leading-[18px] font-medium">
              {label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type TaskCardProps = {
  title: string;
  progress: number;
  startDate: string;
  estimated: string;
  progressColor?: string;
};

function TaskCard({
  title,
  progress,
  startDate,
  estimated,
  progressColor = '#8b5cf6',
}: TaskCardProps) {
  return (
    <Card className="w-full border rounded-lg">
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-400">Ongoing Task</span>
          <h4 className="text-base font-semibold text-gray-900">{title}</h4>

          {/* Progress Bar */}
          <div className="flex flex-col gap-1">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progressColor,
                }}
              />
            </div>
            <span className="text-xs text-gray-500">{progress} % Complete</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="font-semibold text-gray-700">Start Date : </span>
              <span className="text-gray-600">{startDate}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Estimated : </span>
              <span className="text-gray-600">{estimated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Calendar() {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days = [
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    null,
    null,
    null,
    null,
    null,
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">May 2023</h3>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover: bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                text-center text-sm py-2 rounded
                ${!day ? 'text-transparent' : 'text-gray-700 hover:bg-gray-50'}
                ${day === 18 ? 'bg-violet-600 text-white hover:bg-violet-700' : ''}
              `}
            >
              {day || '-'}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingTasks() {
  const tasks = [
    { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
    { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
    { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
    { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
    { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">Upcoming</h3>
        <p className="text-xs text-gray-500 mb-4">May 18, 2023 | 09:00 AM</p>

        <div className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-1 h-12 bg-violet-600 rounded-full" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {task.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardV2() {
  const workProgressTasks = [
    {
      title: 'Dashboard Design',
      progress: 90,
      startDate: '10 Jan',
      estimated: '2 Hours',
      progressColor: '#8b5cf6',
    },
    {
      title: 'Dashboard Design',
      progress: 90,
      startDate: '10 Jan',
      estimated: '2 Hours',
      progressColor: '#8b5cf6',
    },
    {
      title: 'Dashboard Design',
      progress: 90,
      startDate: '10 Jan',
      estimated: '2 Hours',
      progressColor: '#ef4444',
    },
    {
      title: 'Dashboard Design',
      progress: 90,
      startDate: '10 Jan',
      estimated: '2 Hours',
      progressColor: '#10b981',
    },
  ];

  return (
    <Layout>
      <section className="col-span-8 flex flex-col gap-6">
        {/* Welcome Card */}
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
                  <rect
                    x="30"
                    y="40"
                    width="60"
                    height="4"
                    rx="2"
                    fill="#8B5CF6"
                  />
                  <rect
                    x="30"
                    y="50"
                    width="45"
                    height="4"
                    rx="2"
                    fill="#A78BFA"
                  />
                  <rect
                    x="30"
                    y="60"
                    width="50"
                    height="4"
                    rx="2"
                    fill="#C4B5FD"
                  />
                  <circle cx="85" cy="75" r="15" fill="#8B5CF6" opacity="0.3" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value={1120} label="Total Task" Icon={CheckCircle2} />
          <StatCard value={320} label="In Progress" Icon={ListChecks} />
          <StatCard value={760} label="Completed" Icon={CalendarCheck2} />
          <StatCard value={40} label="Overdue" Icon={Timer} />
        </div>

        {/* Charts Section */}
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
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.1"
                      />
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
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 120 120"
                  >
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

        {/* Work Progress & Working Status */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Work Progress */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-gray-900">Work Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workProgressTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  progress={task.progress}
                  startDate={task.startDate}
                  estimated={task.estimated}
                  progressColor={task.progressColor}
                />
              ))}
            </div>
          </div>

          {/* Working Status */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-gray-900">
              Working Status
            </h2>
            <Card className="w-full border rounded-lg flex-1">
              <CardContent className="p-6 flex items-center justify-center h-full min-h-[200px]">
                <p className="text-gray-400 text-sm">No active status</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>

      {/* Sidebar - col-span-4 */}
      <section className="col-span-4 flex flex-col gap-6">
        {/* Calendar */}
        <Calendar />

        {/* Upcoming Tasks */}
        <UpcomingTasks />
      </section>
    </Layout>
  );
}

export default DashboardV2;
