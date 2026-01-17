export type SortOption = 'newest' | 'oldest' | 'a-z';

export type Room = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  members: string[];
  isFavorite: boolean;
};

export type FilterCategory = {
  name: string;
  count?: number;
};

export type FilterOption = {
  label: string;
  value: string;
};
