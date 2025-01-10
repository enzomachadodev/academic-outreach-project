"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { InfiniteScrollContainer } from "@/components/ui/infinite-scroll-container";
import { apiInstance } from "@/lib/api";

import { PostPage } from "../lib/types";
import { PostCard, PostCardSkeleton } from "./post-card";

export const ForYouFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      apiInstance
        .get(
          "/api/posts/for-you",
          pageParam
            ? {
                searchParams: {
                  cursor: pageParam,
                },
              }
            : {},
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isFetching) {
    return (
      <div className="space-y-4 sm:space-y-8">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar as postagens.</p>;
  }

  return (
    <InfiniteScrollContainer
      className="space-y-4 sm:space-y-8"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
};
