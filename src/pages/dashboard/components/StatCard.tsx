import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Stat } from '../types';

export function StatCard({ value, label, icon: Icon = CheckCircle2 }: Stat) {
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
