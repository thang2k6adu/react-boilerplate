export type SessionStatus = 'active' | 'paused' | 'stopped';

export interface TrackingSession {
  id: string;
  taskId: string;
  userId: string;
  startTime: string; // ISO 8601 datetime
  endTime: string | null; // null if not ended
  duration: number; // Seconds (only when endTime != null)
  status: SessionStatus;
  expEarned: number; // Seconds of session
  previousProgress?: number; // Progress prior to session update
  createdAt: string;
  updatedAt: string;
}

export interface ActivateTaskResponse {
  error: boolean;
  code: number;
  message: string;
  data: {
    task: {
      id: string;
      name: string;
      estimateHours: number;
      deadline: string;
      status: string;
      isActive: boolean;
      progress: number;
      totalTimeSpent: number;
      userId: string;
      createdAt: string;
      updatedAt: string;
    };
    session: TrackingSession;
  };
  traceId?: string;
}

export interface SessionResponse {
  error: boolean;
  code: number;
  message: string;
  data: TrackingSession & {
    currentDuration?: number; // Current time in seconds (for display only)
    progress?: number; // Current task progress after stop
  };
  traceId?: string;
}

export interface SessionsProgress {
  progress: number; // % completion
  totalTimeSpent: number; // Total seconds
  estimateSeconds: number; // Estimate hours * 3600
  expEarned: number; // totalTimeSpent in seconds
  sessions: TrackingSession[];
  currentSession: TrackingSession | null;
}

export interface SessionsProgressResponse {
  error: boolean;
  code: number;
  message: string;
  data: SessionsProgress;
  traceId?: string;
}
