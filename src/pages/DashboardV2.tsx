import { Layout } from '../layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ListChecks, CalendarCheck2, Timer } from 'lucide-react';
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

function DashboardV2() {
  return (
    <Layout>
      <section className="col-span-8 flex flex-col gap-8">
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="flex justify-between gap-6">
              <div className="flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-3">
                  <p className="text-[19px] leading-[25px] text-slate-700">
                    Welcome To
                  </p>

                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-[23px] leading-[30px] text-slate-900">
                      Your Task Management Area
                    </h2>
                    <p className="text-[13px] leading-[18px] text-slate-500">
                      Track all your tasks in one place
                    </p>
                  </div>
                </div>

                <Button
                  className="mt-2 w-fit rounded-full bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
                  onClick={() => {
                    console.log('Learn more clicked');
                  }}
                >
                  Learn More
                </Button>
              </div>

              <div className="h-[190px] shrink-0 flex items-center">
                <svg
                  width="190"
                  height="190"
                  viewBox="0 0 190 190"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0"
                    y="0"
                    width="190"
                    height="190"
                    rx="16"
                    fill="#EDE9FE"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard value={1120} label="Total Task" Icon={CheckCircle2} />
          <StatCard value={320} label="In Progress" Icon={ListChecks} />
          <StatCard value={760} label="Completed" Icon={CalendarCheck2} />
          <StatCard value={40} label="Overdue" Icon={Timer} />
        </div>

        <section className="w-full h-[280px] rounded-2xl bg-white p-4">
          {/* Content bên trong */}
        </section>
      </section>

      <section className="col-span-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <p>Nội dung phụ</p>
      </section>
    </Layout>
  );
}

export default DashboardV2;
