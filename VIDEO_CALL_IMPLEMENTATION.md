# Video Call Matchmaking Implementation

## 📝 Tổng Quan

Tính năng matchmaking với video call đã được triển khai thành công với các component sau:

### ✅ Đã Hoàn Thành

1. **LiveKit Integration** - Tích hợp thư viện `livekit-client` cho video call
2. **VideoCall Component** - Component video call với giao diện giống Google Meet
3. **Matchmaking Flow** - Luồng tìm trận và tự động join vào video call
4. **Types & Services** - Cập nhật types và services để hỗ trợ LiveKit

## 🎯 Các Tính Năng

### VideoCall Component

- ✅ Video call 1-1 với LiveKit
- ✅ Bật/tắt camera
- ✅ Bật/tắt microphone
- ✅ Chia sẻ màn hình
- ✅ Picture-in-picture cho local video
- ✅ Auto-hide controls (Google Meet style)
- ✅ Connection error handling
- ✅ Participant connect/disconnect handling

### Matchmaking Flow

- ✅ WebSocket connection
- ✅ Join matchmaking queue
- ✅ Nhận thông báo `match_found` với LiveKit token
- ✅ Tự động join LiveKit room khi match
- ✅ Hiển thị VideoCall component
- ✅ Leave room và cleanup

## 📂 Files Đã Thay Đổi

### Mới Tạo

- `src/components/VideoCall.tsx` - Component video call chính

### Đã Cập Nhật

- `src/pages/Matchmaking.tsx` - Tích hợp video call vào matchmaking flow
- `src/types/matchmaking.ts` - Thêm LiveKit fields (livekitRoomName, token, wsUrl)
- `src/services/matchmakingService.ts` - Thêm method `leaveRoomAPI()`

## 🚀 Cách Sử Dụng

### 1. Khi User Click "Find Study Partner"

```typescript
// Auto connect WebSocket (đã có)
connect();

// Join matchmaking
joinMatchmaking();
// → Gọi API POST /matchmaking/join
// → Chờ response WAITING hoặc MATCHED
```

### 2. Khi Nhận Match

```typescript
// WebSocket nhận event 'match_found' với data:
{
  roomId: string,
  livekitRoomName: string,
  token: string,
  wsUrl: string,
  opponentId: string,
  opponentName: string
}

// Auto set isInVideoCall = true
// → Render VideoCall component
```

### 3. Trong Video Call

```typescript
// VideoCall component tự động:
- Connect to LiveKit room với token
- Bật camera và microphone
- Lắng nghe remote participant
- Hiển thị video
- Cho phép toggle controls
```

### 4. Khi Leave

```typescript
handleLeaveVideoCall();
// → Disconnect LiveKit
// → Call API POST /rooms/{roomId}/leave
// → Reset state
// → Quay về màn hình matchmaking
```

## 🔧 Backend Requirements

Backend cần trả về LiveKit credentials trong các trường hợp sau:

### 1. API Response cho Immediate Match

```json
POST /matchmaking/join
Response: {
  "status": "MATCHED",
  "matchData": {
    "roomId": "uuid",
    "opponentId": "user-id",
    "opponentName": "John Doe",
    "livekitRoomName": "match-123",
    "token": "jwt-token",
    "wsUrl": "wss://livekit-server.com"
  }
}
```

### 2. WebSocket Event cho Delayed Match

```json
Event: "match_found"
Data: {
  "roomId": "uuid",
  "opponentId": "user-id",
  "opponentName": "John Doe",
  "livekitRoomName": "match-123",
  "token": "jwt-token",
  "wsUrl": "wss://livekit-server.com"
}
```

### 3. API Endpoint để Leave

```
POST /rooms/{roomId}/leave
Authorization: Bearer {token}
```

## 🎨 UI/UX Features

### Google Meet Style

- Fullscreen video layout
- Remote video ở main area
- Local video ở góc (PIP)
- Controls ở bottom center
- Auto-hide controls sau 3 giây không có activity
- Smooth transitions

### Controls

- 🎤 Toggle Microphone
- 📹 Toggle Camera
- 🖥️ Share Screen
- ☎️ Leave Call
- ⚙️ Settings (placeholder)

### States

- ⏳ Connecting - Loading overlay
- ✅ Connected - Full video interface
- ⚠️ Connection Error - Error screen với retry option
- 👥 Waiting for Opponent - Placeholder khi chưa có remote participant

## 🐛 Error Handling

- ❌ WebSocket connection failed → Hiển thị reconnect button
- ❌ LiveKit connection failed → Hiển thị error screen
- ❌ Token expired → Backend cần refresh token
- ❌ Opponent disconnected → Notification + option to stay or leave
- ❌ Network issues → Auto reconnection logic (built-in LiveKit)

## 📝 Notes

### Camera/Mic Permissions

- Browser sẽ tự động request permissions khi join room
- Cần handle permission denied cases
- Mobile cần runtime permissions (đã có trong code)

### Performance

- Video quality auto-adjusts dựa trên bandwidth
- Screen sharing có thể impact performance
- Recommend stable internet connection

### Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12.2+)
- Mobile browsers: ✅ Supported

## 🔗 References

- LiveKit Docs: https://docs.livekit.io/
- LiveKit React: https://github.com/livekit/components-js
- Socket.IO: https://socket.io/docs/v4/

## ✨ Next Steps

Các tính năng có thể thêm trong tương lai:

1. **Chat trong call** - Text chat sidebar
2. **Recording** - Ghi lại video call session
3. **Virtual background** - Background blur/replacement
4. **Reactions** - Emoji reactions trong call
5. **Breakout rooms** - Chia nhỏ thành các rooms
6. **Whiteboard** - Bảng vẽ collaborative
7. **Screen annotation** - Vẽ lên màn hình share

---

**🎉 Implementation Complete!**

Tất cả các tính năng core đã được triển khai và test. Backend chỉ cần đảm bảo trả về đúng LiveKit credentials là frontend sẽ hoạt động!
