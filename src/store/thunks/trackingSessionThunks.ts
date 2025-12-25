import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { trackingSessionService } from '@/services/trackingSessionService';
import {
  ActivateTaskResponse,
  SessionResponse,
  SessionsProgressResponse,
} from '@/types/trackingSession';

/**
 * Activate task and start tracking session
 */
export const activateTaskThunk = createAsyncThunk<
  ActivateTaskResponse['data'],
  string,
  { rejectValue: string }
>('trackingSession/activate', async (taskId, { rejectWithValue }) => {
  try {
    const response = await trackingSessionService.activateTask(taskId);
    return response.data;
  } catch (error: unknown) {
    const message = (error as AxiosError<{ message?: string }>).response?.data
      ?.message;
    return rejectWithValue(message || 'Failed to activate task');
  }
});

/**
 * Pause tracking session
 */
export const pauseSessionThunk = createAsyncThunk<
  SessionResponse['data'],
  string,
  { rejectValue: string }
>('trackingSession/pause', async (sessionId, { rejectWithValue }) => {
  try {
    const response = await trackingSessionService.pauseSession(sessionId);
    return response.data;
  } catch (error: unknown) {
    const message = (error as AxiosError<{ message?: string }>).response?.data
      ?.message;
    return rejectWithValue(message || 'Failed to pause session');
  }
});

/**
 * Resume tracking session
 */
export const resumeSessionThunk = createAsyncThunk<
  SessionResponse['data'],
  string,
  { rejectValue: string }
>('trackingSession/resume', async (sessionId, { rejectWithValue }) => {
  try {
    const response = await trackingSessionService.resumeSession(sessionId);
    return response.data;
  } catch (error: unknown) {
    const message = (error as AxiosError<{ message?: string }>).response?.data
      ?.message;
    return rejectWithValue(message || 'Failed to resume session');
  }
});

/**
 * Stop tracking session
 */
export const stopSessionThunk = createAsyncThunk<
  SessionResponse['data'],
  string,
  { rejectValue: string }
>('trackingSession/stop', async (sessionId, { rejectWithValue }) => {
  try {
    const response = await trackingSessionService.stopSession(sessionId);
    return response.data;
  } catch (error: unknown) {
    const message = (error as AxiosError<{ message?: string }>).response?.data
      ?.message;
    return rejectWithValue(message || 'Failed to stop session');
  }
});

/**
 * Get progress and all sessions of a task
 */
export const getProgressThunk = createAsyncThunk<
  SessionsProgressResponse['data'],
  string,
  { rejectValue: string }
>('trackingSession/progress', async (taskId, { rejectWithValue }) => {
  try {
    const response = await trackingSessionService.getProgress(taskId);
    return response.data;
  } catch (error: unknown) {
    const message = (error as AxiosError<{ message?: string }>).response?.data
      ?.message;
    return rejectWithValue(message || 'Failed to get progress');
  }
});
