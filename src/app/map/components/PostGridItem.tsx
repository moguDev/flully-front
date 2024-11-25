import { Post } from "@/app/types";
import Image from "next/image";
import defaultImage from "/public/images/default_avatar.png";

export const PostGridItem = ({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) => {
  return (
    <div
      key={`post-${post.id}`}
      className="w-full h-32 overflow-hidden relative rounded"
      onClick={onClick}
    >
      <Image
        src={post.imageUrl || defaultImage}
        alt={`postImage-${post.id}`}
        className="object-cover"
        fill
      />
    </div>
  );
};
