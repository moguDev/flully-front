export type User = {
  name: string;
  nickname: string;
  avatarUrl: string;
  location: string;
  email: string;
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
