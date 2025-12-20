/* eslint-disable */
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { TOKEN_STORAGE_KEYS } from '@/constants';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private processQueue = (
    error: AxiosError | null,
    token: string | null = null
  ) => {
    this.failedQueue.forEach(prom => {
      if (error) {
        // Do nothing - let it fail
      } else {
        prom(token || '');
      }
    });
    this.isRefreshing = false;
    this.failedQueue = [];
  };

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem(
          TOKEN_STORAGE_KEYS.ACCESS_TOKEN
        );
        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue request while refreshing
            return new Promise(resolve => {
              this.failedQueue.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem(
              TOKEN_STORAGE_KEYS.REFRESH_TOKEN
            );
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await this.client.post<{
              error: boolean;
              data: { accessToken: string; expiresIn: number } | null;
            }>('/auth/refresh', { refreshToken });

            if (response.data?.data?.accessToken) {
              const { accessToken, expiresIn } = response.data.data;
              localStorage.setItem(
                TOKEN_STORAGE_KEYS.ACCESS_TOKEN,
                accessToken
              );
              localStorage.setItem(
                TOKEN_STORAGE_KEYS.TOKEN_EXPIRES_AT,
                (Date.now() + expiresIn * 1000).toString()
              );

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              this.processQueue(null, accessToken);
              return this.client(originalRequest);
            }
          } catch (_err) {
            this.processQueue(error as AxiosError, null);
            localStorage.removeItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
          }

          return Promise.reject(error);
        }

        // Handle other errors
        if (error.response) {
          const status = error.response.status;
          const message =
            (error.response.data as { message?: string })?.message ||
            'An error occurred';

          switch (status) {
            case 401:
              localStorage.removeItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
              localStorage.removeItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
              window.location.href = '/login';
              toast.error('Session expired. Please login again.');
              break;
            case 403:
              toast.error('You do not have permission to perform this action.');
              break;
            case 404:
              toast.error('Resource not found.');
              break;
            case 500:
              toast.error('Server error. Please try again later.');
              break;
            default:
              toast.error(message);
          }
        } else if (error.request) {
          toast.error('Network error. Please check your connection.');
        } else {
          toast.error('An unexpected error occurred.');
        }

        return Promise.reject(error);
      }
    );
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.client.post<T>(url, data, config);
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.client.put<T>(url, data, config);
  }

  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.client.patch<T>(url, data, config);
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
