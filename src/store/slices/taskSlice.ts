import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/task';
import {
  fetchTasksThunk,
  fetchActiveTaskThunk,
  createTaskThunk,
  updateTaskThunk,
  activateTaskThunk,
  completeTaskThunk,
  deleteTaskThunk,
} from '../thunks/taskThunks';

interface TaskState {
  tasks: Task[];
  activeTask: Task | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

const initialState: TaskState = {
  tasks: [],
  activeTask: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateRemainingTime: (state, action: PayloadAction<number>) => {
      // Cập nhật remainingTime cho active task
      if (state.activeTask) {
        state.activeTask.remainingTime = action.payload;
        const index = state.tasks.findIndex(t => t.id === state.activeTask!.id);
        if (index !== -1) {
          state.tasks[index].remainingTime = action.payload;
        }
      }
    },
  },
  extraReducers: builder => {
    // Fetch tasks
    builder
      .addCase(fetchTasksThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data.items;
        state.total = action.payload.data.meta.totalItems;
        state.page = action.payload.data.meta.currentPage;
        state.limit = action.payload.data.meta.itemsPerPage;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch tasks';
      });

    // Fetch active task
    builder
      .addCase(fetchActiveTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActiveTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeTask = action.payload;
      })
      .addCase(fetchActiveTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch active task';
      });

    // Create task
    builder
      .addCase(createTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create task';
      });

    // Update task
    builder
      .addCase(updateTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update task';
      });

    // Activate task
    builder
      .addCase(activateTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Deactivate all other tasks
        state.tasks = state.tasks.map(task => ({
          ...task,
          isActive: task.id === action.payload.id,
          status: task.id === action.payload.id ? 'ACTIVE' : task.status,
        }));
        // Set active task
        const activatedTask = state.tasks.find(t => t.id === action.payload.id);
        if (activatedTask) {
          state.activeTask = activatedTask;
        }
      })
      .addCase(activateTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to activate task';
      });

    // Complete task
    builder
      .addCase(completeTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index].status = 'DONE';
          state.tasks[index].isActive = false;
        }
        if (state.activeTask?.id === action.payload.id) {
          state.activeTask = null;
        }
      })
      .addCase(completeTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to complete task';
      });

    // Delete task
    builder
      .addCase(deleteTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
        state.total -= 1;
        if (state.activeTask?.id === action.payload) {
          state.activeTask = null;
        }
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete task';
      });
  },
});

export const { clearError, setPage, updateRemainingTime } = taskSlice.actions;
export default taskSlice.reducer;
