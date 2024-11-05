export type User = {
  name: string;
  nickname: string;
  avatarUrl: string;
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
