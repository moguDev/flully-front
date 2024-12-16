export type User = {
  id: number;
  name: string;
  nickname: string;
  introduction: string;
  avatarUrl: string;
  location: string;
  email: string;
  twitter: string;
  boards?: Board[];
  posts?: Post[];
  currentStreak?: number;
  isMailPublic?: boolean;
  isLocationPublic?: boolean;
  followersCount?: number;
  followingCount?: number;
  explorePoints?: number;
  level?: number;
};

export type Board = {
  id: number;
  category: string;
  species: string;
  status: string;
  name: string;
  iconUrl: string;
  age: number;
  formatedDate: string;
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
  images: { id: number; url: string }[];
};

export type NekoSearchBoard = {
  id: number;
  area: string;
  bestFeature: string;
  bodyColor: string;
  date: string;
  eyeColor: string;
  name: string;
  pictUrl: string;
  siteUrl: string;
  type: string;
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
  formatedDate: string;
  createdAt: string;
};

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  body: string;
  createdAt: string;
  user: User;
};

export type TimelineItem = {
  type: string;
  content: Board | Post;
};

export type Notification = {
  id: number;
  category: "follow" | "like" | "post_comment" | "board_comment";
  body: string;
  checked: boolean;
  url: string;
  createdAt: string;
};
