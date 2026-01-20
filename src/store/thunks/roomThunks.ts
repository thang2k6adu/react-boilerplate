import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomService } from '@/services/roomService';
import { PublicRoom, JoinRoomResponse, RoomDetail } from '@/types/room';

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    return response?.data?.message || fallback;
  }
  return fallback;
};

// Fetch public rooms
export const fetchPublicRoomsThunk = createAsyncThunk<
  PublicRoom[],
  undefined,
  { rejectValue: string }
>('room/fetchPublicRooms', async (_, { rejectWithValue }) => {
  try {
    return await roomService.getPublicRooms();
  } catch (error: unknown) {
    return rejectWithValue(
      getErrorMessage(error, 'Failed to fetch public rooms')
    );
  }
});

// Join room
export const joinRoomThunk = createAsyncThunk<
  JoinRoomResponse,
  string,
  { rejectValue: string }
>('room/joinRoom', async (roomId, { rejectWithValue }) => {
  try {
    return await roomService.joinRoom(roomId);
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to join room'));
  }
});

// Fetch room detail
export const fetchRoomDetailThunk = createAsyncThunk<
  RoomDetail,
  string,
  { rejectValue: string }
>('room/fetchRoomDetail', async (roomId, { rejectWithValue }) => {
  try {
    return await roomService.getRoomDetail(roomId);
  } catch (error: unknown) {
    return rejectWithValue(
      getErrorMessage(error, 'Failed to fetch room detail')
    );
  }
});

// Leave room
export const leaveRoomThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('room/leaveRoom', async (roomId, { rejectWithValue }) => {
  try {
    await roomService.leaveRoom(roomId);
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, 'Failed to leave room'));
  }
});
