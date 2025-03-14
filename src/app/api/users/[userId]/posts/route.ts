import { NextRequest } from "next/server";

import { getSession } from "@/features/auth/lib/actions";
import { getPostDataInclude, PostsPage } from "@/features/posts/lib/types";
import { db } from "@/lib/db";
import { idSchema } from "@/lib/validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const session = await getSession();

    const validId = idSchema.safeParse(userId);

    if (!validId.success)
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );

    const posts = await db.post.findMany({
      where: {
        userId: validId.data,
      },
      include: getPostDataInclude(session?.user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
