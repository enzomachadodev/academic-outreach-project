import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/features/users/components/user-avatar";
import { formatRelativeDate } from "@/lib/utils";

import { PostData } from "../lib/types";

interface PostCardProps {
  post: PostData;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { id, content, user, createdAt } = post;

  return (
    <article className="w-full">
      <Card>
        <CardHeader className="flex-row items-center gap-4">
          <Link href={`/profile/${user.username}`}>
            <UserAvatar
              name={user.name}
              image={user.image || ""}
              className="size-12"
            />
          </Link>
          <div className="space-y-1">
            <Link href={`/users/${user.username}`}>
              <CardTitle className="hover:underline">{user.name}</CardTitle>
            </Link>
            <Link
              href={`/posts/${id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(createdAt)}
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <article className="whitespace-pre-line break-words">
            {content}
          </article>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </article>
  );
};

export const PostCardSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
    <Skeleton className="h-40 w-full" />
  </div>
);
