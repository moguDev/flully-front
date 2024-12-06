import { Post } from "@/app/types";
import Image from "next/image";
import defaultImage from "/public/images/default_avatar.png";
import { removeParamsFromUrl } from "@/lib";

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
      className="w-full h-44 overflow-hidden relative rounded cursor-pointer transition-all duration-500 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-center justify-between absolute bottom-0 left-0 w-full bg-black bg-opacity-20 backdrop-blur-sm z-10 px-1 py-0.5">
        <p className="text-white text-sm font-bold flex items-center">
          <span className="material-icons mr-0.5" style={{ fontSize: "14px" }}>
            favorite
          </span>
          {post.likeCount}
        </p>
        {post.user && (
          <div className="flex items-center">
            <div className="relative h-3 w-3 rounded-full overflow-hidden mr-0.5">
              <Image
                src={removeParamsFromUrl(post.user?.avatarUrl) || defaultImage}
                alt={post.user?.name || "icon"}
                className="object-cover"
                fill
              />
            </div>
            <p className="text-xs text-white font-bold">
              {post.user?.nickname}
            </p>
          </div>
        )}
      </div>
      <Image
        src={removeParamsFromUrl(post.imageUrl) || defaultImage}
        alt={`postImage-${post.id}`}
        className="object-cover"
        fill
      />
    </div>
  );
};
