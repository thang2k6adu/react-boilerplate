import { createSlice } from '@reduxjs/toolkit';
import { PublicRoom, JoinRoomResponse, RoomDetail } from '@/types/room';
import {
  fetchPublicRoomsThunk,
  joinRoomThunk,
  fetchRoomDetailThunk,
  leaveRoomThunk,
} from '../thunks/roomThunks';

interface RoomState {
  publicRooms: PublicRoom[];
  currentRoom: JoinRoomResponse | null;
  roomDetail: RoomDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  publicRooms: [],
  currentRoom: null,
  roomDetail: null,
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentRoom: state => {
      state.currentRoom = null;
      state.roomDetail = null;
    },
  },
  extraReducers: builder => {
    // Fetch public rooms
    builder
      .addCase(fetchPublicRoomsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicRoomsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicRooms = action.payload;
      })
      .addCase(fetchPublicRoomsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch public rooms';
      });

    // Join room
    builder
      .addCase(joinRoomThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinRoomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRoom = action.payload;
      })
      .addCase(joinRoomThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to join room';
      });

    // Fetch room detail
    builder
      .addCase(fetchRoomDetailThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roomDetail = action.payload;
      })
      .addCase(fetchRoomDetailThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch room detail';
      });

    // Leave room
    builder
      .addCase(leaveRoomThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(leaveRoomThunk.fulfilled, state => {
        state.isLoading = false;
        state.currentRoom = null;
        state.roomDetail = null;
      })
      .addCase(leaveRoomThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to leave room';
      });
  },
});

export const { clearError, clearCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
