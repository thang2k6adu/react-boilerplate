# Focus V2 Architecture

## 📁 Cấu trúc folder

```
focus/
├── FocusV2.tsx              # Container chính - chỉ layout + grid
├── index.ts                 # Export module
├── types.ts                 # Type definitions
├── constants.ts             # Data & semantic color mapping
├── sections/                # Các section lớn
│   ├── FilterSidebar.tsx
│   ├── WelcomeBanner.tsx
│   └── RoomsGrid.tsx
└── components/              # UI components (atomic)
    ├── RoomCard.tsx
    ├── FilterComponents.tsx
    └── SortButtons.tsx
```

## 🎯 Nguyên tắc thiết kế

### 1. **Tách theo SECTION**

```
FocusV2 (container)
├── FilterSidebar (col-span-2)
│   ├── SortButtons
│   └── FilterGroups
└── Right Section (col-span-10)
    ├── WelcomeBanner
    └── RoomsGrid
        └── RoomCard (map)
```

### 2. **Component UI chỉ là UI**

- Không chứa data hardcode
- Nhận props từ bên ngoài
- Reusable và testable

### 3. **Semantic Colors**

```ts
export const BUTTON_COLORS = {
  primary: 'bg-purple-600 hover:bg-purple-700',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
  active: 'bg-purple-600 text-white',
  inactive: 'bg-gray-100 text-gray-600',
};
```

## 📊 Data Flow

```
constants.ts (data)
    ↓
FocusV2.tsx (container)
    ↓
Section Components
    ├── FilterSidebar (filters data)
    ├── WelcomeBanner
    └── RoomsGrid (rooms data)
    ↓
UI Components
    ├── RoomCard
    ├── FilterComponents
    └── SortButtons
```

## 🔄 Cách sử dụng

```tsx
// Import đơn giản
import FocusV2 from '@/pages/focus';

// Hoặc import cụ thể
import FocusV2, { ROOMS, BUTTON_COLORS } from '@/pages/focus';
```

## ✅ So sánh trước/sau

### ❌ Trước (Focus.tsx)

- 1 file 400+ lines
- Data hardcode trong JSX
- Filter logic lặp lại nhiều lần
- Khó maintain và test

### ✅ Sau (focus/)

- Tách thành 11 files rõ ràng
- Data tách riêng vào constants
- Filter components reusable
- Type-safe với TypeScript
- Semantic color system

## 🚀 Mở rộng

### Thêm filter category mới:

```ts
// Trong constants.ts
export const NEW_OPTIONS: FilterOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];

// Trong FilterSidebar.tsx
<FilterGroup title="New Category">
  <SimpleFilter options={NEW_OPTIONS} />
</FilterGroup>
```

### Kết nối API:

```tsx
const { data: rooms } = useQuery('rooms', fetchRooms);
<RoomsGrid rooms={rooms} />;
```

### Thêm button style mới:

```ts
export const BUTTON_COLORS = {
  primary: 'bg-purple-600 hover:bg-purple-700',
  danger: 'bg-red-600 hover:bg-red-700', // ← Thêm mới
  success: 'bg-green-600 hover:bg-green-700', // ← Thêm mới
};
```

## 🎨 Features

- ✅ Room cards với favorite toggle
- ✅ Multiple filter categories (Category, Status, Price, Capacity, Room)
- ✅ Sort options (Newest, Oldest, A-Z)
- ✅ Member avatars display
- ✅ Hover effects và transitions
- ✅ Grid responsive layout
