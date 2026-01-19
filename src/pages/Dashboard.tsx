import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTasks } from '@/hooks/useTasks';
import TimerCard from '@/components/TimerCard';
import PlannedTasks from '@/components/PlannedTasks';
import ProjectProgress from '@/components/ProjectProgress';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { COLORS, FONTS } from '@/constants/theme';

const Dashboard: React.FC = () => {
  const {
    tasks,
    activeTask,
    isLoading,
    fetchTasks,
    fetchActiveTask,
    activateTask,
    completeTask,
    createTask,
  } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    estimateHours: '',
    deadline: '',
  });
  const [taskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchActiveTask();
  }, [fetchTasks, fetchActiveTask]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.estimateHours || !formData.deadline) return;

    await createTask({
      name: formData.name,
      estimateHours: Number(formData.estimateHours),
      deadline: formData.deadline,
    });

    setFormData({ name: '', estimateHours: '', deadline: '' });
    setIsCreateModalOpen(false);
    fetchTasks();
  };

  const handleActivateTask = async (taskId: string) => {
    // Check if there's already an active task
    if (activeTask && activeTask.id !== taskId) {
      toast.error(
        `Please complete "${activeTask.name}" before activating another task`
      );
      return;
    }

    await activateTask(taskId);
    await fetchActiveTask();
    setTaskProgress(0);
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId);
    await fetchActiveTask();
    fetchTasks();
  };

  const plannedTasksList = tasks
    .filter(t => t.status === 'PLANNED')
    .map(t => ({
      id: t.id,
      title: t.name,
      dueDate: new Date(t.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      icon: '📊',
      color: 'bg-emerald-100',
    }));

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Donezo</title>
        <meta name="description" content="Task management dashboard" />
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              Dashboard
            </h1>
            <p className="mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
            }}
          >
            + New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTask ? (
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="absolute top-6 left-6">
                  <span className="bg-emerald-400/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    Running Task
                  </span>
                </div>

                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-6">{activeTask.name}</h2>

                  <div className="flex items-center space-x-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-emerald-50">
                        {activeTask.estimateHours}:00:00 (Estimated)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-emerald-50">
                        Deadline:{' '}
                        {new Date(activeTask.deadline).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteTask(activeTask.id)}
                    className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-lg"
                  >
                    COMPLETE TASK
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="p-6 rounded-lg border-2 border-dashed text-center"
                style={{
                  borderColor: COLORS.BORDER,
                  backgroundColor: COLORS.BG_SECONDARY,
                }}
              >
                <p
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: FONTS.SIZE.LG,
                  }}
                >
                  No active task. Select one to get started!
                </p>
              </div>
            )}
          </div>

          {/* Timer Card */}
          <div>
            <TimerCard
              initialTime={activeTask ? activeTask.estimateHours * 3600 : 5048}
              isActive={!!activeTask}
              onComplete={() => {
                if (activeTask) {
                  handleCompleteTask(activeTask.id);
                }
              }}
              onProgressChange={setTaskProgress}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PlannedTasks
              tasks={plannedTasksList}
              onAddTask={() => setIsCreateModalOpen(true)}
              onSelectTask={handleActivateTask}
            />
          </div>

          <div>
            <ProjectProgress
              percentage={taskProgress}
              taskName={activeTask?.name || 'No active task'}
              isActive={!!activeTask}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter task name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Estimate (hours)
            </label>
            <input
              type="number"
              value={formData.estimateHours}
              onChange={e =>
                setFormData({ ...formData, estimateHours: e.target.value })
              }
              placeholder="e.g., 6"
              min="0.5"
              step="0.5"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={e =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
