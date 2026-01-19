import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FloatingInput } from '@/components/FloatingInput';
import { FloatingTextarea } from '@/components/FloatingTextarea';
import { FloatingDatePicker } from '@/components/FloatingDatePicker';

export function CreateTaskDialog() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 7
    )
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="
            h-12 w-12
            rounded-xl
            bg-violet-600
            text-white
            transition-transform
            duration-150
            hover:scale-[1.05]
            active:scale-95
          "
        >
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="!text-h5-medium">Create Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <FloatingInput label="Task Name" />

          <FloatingInput label="Estimated Time (Hour)" type="number" />

          <FloatingDatePicker
            label="Deadline"
            value={date}
            onChange={setDate}
          />

          <FloatingTextarea label="Description" />
        </div>
        <Button className="mt-2 bg-violet-600 hover:bg-violet-700">
          Create Task
        </Button>
      </DialogContent>
    </Dialog>
  );
}
