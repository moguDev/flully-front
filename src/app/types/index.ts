export type User = {
  name: string;
  nickname: string;
  introduction: string;
  avatarUrl: string;
  location: string;
  email: string;
  twitter: string;
  boards?: Board[];
  posts?: Post[];
  walks?: Walk[];
};

export type Walk = {
  id: number;
  startTime: string;
  finishTime: string;
  totalDistance: number;
};

export type Board = {
  id: number;
  category: string;
  species: string;
  status: string;
  name: string;
  iconUrl: string;
  age: number;
  date: string;
  lat: number | null;
  lng: number | null;
  location: string;
  isLocationPublic: boolean;
  body: string;
  feature: string;
  createdAt: string;
  updatedAt: string;
  breed: string;
  user: User;
  bookmarkCount: number;
  images: string[];
};

export type BoardComment = {
  id: number;
  user: User;
  contentType: string;
  content: string | { lat: number; lng: number };
  createdAt: string;
};

export type Post = {
  id: number;
  imageUrl: string;
  body: string;
  lat: number;
  lng: number;
  isAnonymous: boolean;
  user: User | null;
  likeCount: number;
};

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  body: string;
  createdAt: string;
  user: User;
};
