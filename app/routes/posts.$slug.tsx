import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import invariant from "tiny-invariant";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<Response> => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug ?? "");
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.content);
  return json({ html, post });
};

export default function PostSlug() {
  const { html, post } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
