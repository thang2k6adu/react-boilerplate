/**
 * Task Service
 * Xử lý các API calls liên quan đến Task
 */

import apiClient from '@/utils/api';
import {
  CreateTaskData,
  UpdateTaskData,
  TaskListResponse,
  TaskResponse,
  ActiveTaskResponse,
  TaskActionResponse,
} from '@/types/task';
import { API_ENDPOINTS } from '@/constants';

export const taskService = {
  // Lấy danh sách tasks
  getTasks: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<TaskListResponse> => {
    const response = await apiClient.get<TaskListResponse>(
      API_ENDPOINTS.TASKS.LIST,
      { params }
    );
    return response.data;
  },

  // Lấy task theo ID
  getTaskById: async (id: string): Promise<TaskResponse> => {
    const response = await apiClient.get<TaskResponse>(
      API_ENDPOINTS.TASKS.DETAIL(id)
    );
    return response.data;
  },

  // Lấy active task
  getActiveTask: async (): Promise<ActiveTaskResponse> => {
    const response = await apiClient.get<ActiveTaskResponse>(
      API_ENDPOINTS.TASKS.ACTIVE
    );
    return response.data;
  },

  // Tạo task mới
  createTask: async (data: CreateTaskData): Promise<TaskResponse> => {
    const response = await apiClient.post<TaskResponse>(
      API_ENDPOINTS.TASKS.CREATE,
      data
    );
    return response.data;
  },

  // Cập nhật task
  updateTask: async (
    id: string,
    data: UpdateTaskData
  ): Promise<TaskResponse> => {
    const response = await apiClient.put<TaskResponse>(
      API_ENDPOINTS.TASKS.UPDATE(id),
      data
    );
    return response.data;
  },

  // Activate task (set as active)
  activateTask: async (id: string): Promise<TaskActionResponse> => {
    const response = await apiClient.post<TaskActionResponse>(
      API_ENDPOINTS.TASKS.ACTIVATE(id),
      {}
    );
    return response.data;
  },

  // Complete task
  completeTask: async (id: string): Promise<TaskActionResponse> => {
    const response = await apiClient.post<TaskActionResponse>(
      API_ENDPOINTS.TASKS.COMPLETE(id),
      {}
    );
    return response.data;
  },

  // Xóa task
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(id));
  },
};
