import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MatchmakingState,
  UserState,
  RoomData,
  MatchData,
} from '@/types/matchmaking';

const initialState: MatchmakingState = {
  state: UserState.IDLE,
  isConnected: false,
  isConnecting: false,
  room: null,
  matchData: null,
  error: null,
  isJoining: false,
  isCanceling: false,
};

const matchmakingSlice = createSlice({
  name: 'matchmaking',
  initialState,
  reducers: {
    // WebSocket connection
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (action.payload) {
        state.isConnecting = false;
        state.error = null;
      }
    },
    setConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnected = false;
      state.isConnecting = false;
    },

    // Matchmaking state
    setUserState: (state, action: PayloadAction<UserState>) => {
      state.state = action.payload;
    },

    // Join matchmaking
    setJoining: (state, action: PayloadAction<boolean>) => {
      state.isJoining = action.payload;
    },
    joinSuccess: state => {
      state.isJoining = false;
      state.state = UserState.WAITING;
      state.error = null;
    },
    joinError: (state, action: PayloadAction<string>) => {
      state.isJoining = false;
      state.error = action.payload;
    },

    // Cancel matchmaking
    setCanceling: (state, action: PayloadAction<boolean>) => {
      state.isCanceling = action.payload;
    },
    cancelSuccess: state => {
      state.isCanceling = false;
      state.state = UserState.IDLE;
      state.error = null;
    },
    cancelError: (state, action: PayloadAction<string>) => {
      state.isCanceling = false;
      state.error = action.payload;
    },

    // Match found
    setMatchData: (state, action: PayloadAction<MatchData>) => {
      state.matchData = action.payload;
      state.state = UserState.IN_ROOM;
      state.isJoining = false;
    },

    // Room actions
    setRoom: (state, action: PayloadAction<RoomData | null>) => {
      state.room = action.payload;
      if (action.payload) {
        state.state = UserState.IN_ROOM;
      } else {
        state.state = UserState.IDLE;
      }
    },
    joinedRoom: (state, action: PayloadAction<RoomData>) => {
      state.room = action.payload;
      state.state = UserState.IN_ROOM;
    },
    leftRoom: state => {
      state.room = null;
      state.matchData = null;
      state.state = UserState.IDLE;
    },

    // Opponent events
    opponentDisconnected: state => {
      state.room = null;
      state.matchData = null;
      state.state = UserState.IDLE;
      state.error = 'Your opponent has disconnected';
    },
    opponentLeft: state => {
      state.room = null;
      state.matchData = null;
      state.state = UserState.IDLE;
      state.error = 'Your opponent has left the room';
    },

    // Clear error
    clearError: state => {
      state.error = null;
    },

    // Reset state
    reset: state => {
      state.state = UserState.IDLE;
      state.room = null;
      state.matchData = null;
      state.error = null;
      state.isJoining = false;
      state.isCanceling = false;
    },
  },
});

export const {
  setConnecting,
  setConnected,
  setConnectionError,
  setUserState,
  setJoining,
  joinSuccess,
  joinError,
  setCanceling,
  cancelSuccess,
  cancelError,
  setMatchData,
  setRoom,
  joinedRoom,
  leftRoom,
  opponentDisconnected,
  opponentLeft,
  clearError,
  reset,
} = matchmakingSlice.actions;

export default matchmakingSlice.reducer;
