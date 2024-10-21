import { supabase } from "~/supabase";

type Post = {
  slug: string;
  title: string;
};

export async function getPosts(): Promise<Array<Post>> {
  const { data, error } = await supabase
    .from("posts")
    .select("*");

  if (error) {
    console.error('Error fetching posts:', error);
  } else {
    console.log(data);
  }

  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
}
