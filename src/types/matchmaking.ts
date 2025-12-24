export enum UserState {
  IDLE = 'IDLE',
  WAITING = 'WAITING',
  IN_ROOM = 'IN_ROOM',
}

export enum MatchmakingStatus {
  WAITING = 'WAITING',
  MATCHED = 'MATCHED',
}

export interface RoomData {
  roomId: string;
  players: string[];
  createdAt: string;
}

export interface MatchData {
  roomId: string;
  opponentId: string;
  opponentName: string;
}

export interface MatchFoundEvent {
  roomId: string;
  opponentId: string;
  opponentName: string;
  message: string;
}

export interface OpponentDisconnectedEvent {
  message: string;
  roomId: string;
}

export interface OpponentLeftEvent {
  message: string;
  roomId: string;
}

export interface RoomJoinedEvent {
  roomId: string;
  message: string;
}

export interface RoomLeftEvent {
  message: string;
}

export interface JoinMatchmakingResponse {
  error: boolean;
  code: number;
  message: string;
  data: {
    status: MatchmakingStatus;
    message: string;
    matchData?: MatchData;
  };
}

export interface CancelMatchmakingResponse {
  error: boolean;
  code: number;
  message: string;
  data: {
    message: string;
  };
}

export interface GetStatusResponse {
  error: boolean;
  code: number;
  message: string;
  data: {
    state: UserState;
    room?: RoomData;
  };
}

export interface GetStatsResponse {
  error: boolean;
  code: number;
  message: string;
  data: {
    waitingQueueSize: number;
    activeRooms: number;
    onlineUsers: number;
    stateDistribution: {
      idle: number;
      waiting: number;
      inRoom: number;
    };
  };
}

export interface MatchmakingState {
  state: UserState;
  isConnected: boolean;
  isConnecting: boolean;
  room: RoomData | null;
  matchData: MatchData | null;
  error: string | null;
  isJoining: boolean;
  isCanceling: boolean;
}
