import { supabase } from "~/supabase";

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

export async function getPosts(): Promise<Post[] | undefined> {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
  } else {
    console.log(data);
  }

  return data?.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    author_id: post.author_id,
    category_id: post.category_id,
    tags: post.tags,
    featured_img: post.featured_img,
    published_date: post.published_date,
    updated_date: post.updated_date,
  }));
}

export async function getPost(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug);

  if (error || !data) {
    console.error("Error fetching post:", error);
  } else {
    console.log(data);
  }

  return data?.[0];
}
