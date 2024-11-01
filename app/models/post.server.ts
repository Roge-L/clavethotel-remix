import { getSupabaseClient } from "~/supabase";
import type { AppLoadContext } from "@remix-run/cloudflare";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  author_id: number | null;
  category_id: number | null;
  tags: string[] | null;
  featured_img: string | null;
  published_date: string | null;
  updated_date: string | null;
};

export async function getPosts(context: AppLoadContext): Promise<Post[]> {
  const supabase = getSupabaseClient(context);
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getPost(
  slug: string,
  context: AppLoadContext
): Promise<Post | null> {
  const supabase = getSupabaseClient(context);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as Post;
}
