import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from '@/services/taskService';
import {
  CreateTaskData,
  UpdateTaskData,
  Task,
  TaskListResponse,
  TaskActionResponse,
} from '@/types/task';

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    return response?.data?.message || fallback;
  }
  return fallback;
};

// Fetch tasks
export const fetchTasksThunk = createAsyncThunk<
  TaskListResponse,
  { page?: number; limit?: number } | undefined,
  { rejectValue: string }
>('task/fetchTasks', async (params, { rejectWithValue }) => {
  try {
    return await taskService.getTasks(params);
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to fetch tasks'));
  }
});

// Fetch active task
export const fetchActiveTaskThunk = createAsyncThunk<
  Task | null,
  undefined,
  { rejectValue: string }
>('task/fetchActiveTask', async (_, { rejectWithValue }) => {
  try {
    const response = await taskService.getActiveTask();
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      getErrorMessage(error, 'Failed to fetch active task')
    );
  }
});

// Create task
export const createTaskThunk = createAsyncThunk<
  Task,
  CreateTaskData,
  { rejectValue: string }
>('task/createTask', async (data, { rejectWithValue }) => {
  try {
    const response = await taskService.createTask(data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to create task'));
  }
});

// Update task
export const updateTaskThunk = createAsyncThunk<
  Task,
  { id: string; data: UpdateTaskData },
  { rejectValue: string }
>('task/updateTask', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await taskService.updateTask(id, data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to update task'));
  }
});

// Activate task
export const activateTaskThunk = createAsyncThunk<
  TaskActionResponse['data'],
  string,
  { rejectValue: string }
>('task/activateTask', async (id, { rejectWithValue }) => {
  try {
    const response = await taskService.activateTask(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to activate task'));
  }
});

// Complete task
export const completeTaskThunk = createAsyncThunk<
  TaskActionResponse['data'],
  string,
  { rejectValue: string }
>('task/completeTask', async (id, { rejectWithValue }) => {
  try {
    const response = await taskService.completeTask(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to complete task'));
  }
});

// Delete task
export const deleteTaskThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('task/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await taskService.deleteTask(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to delete task'));
  }
});
