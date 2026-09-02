import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/models/post.server";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs } from "~/lib/structured-data";
import { excerpt } from "~/lib/markdown";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "News & Updates",
    description:
      "News, events and updates from Clavet Motor Inn, Clavet Cafe and Clavet Bar in Clavet, Saskatchewan.",
    pathname: location.pathname,
  }),
  { "script:ld+json": breadcrumbs([{ name: "News & Updates", path: "/posts" }]) },
];

export async function loader({ context }: LoaderFunctionArgs) {
  const posts = await getPosts(context);
  return {
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      publishedDate: post.published_date,
      summary: excerpt(post.content ?? ""),
    })),
  };
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-4xl text-slate-900">
          News &amp; Updates
        </h1>

        {posts.length === 0 ? (
          <p className="text-slate-600">
            There&apos;s nothing here just yet — check back soon.
          </p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-slate-200 pb-8 last:border-0"
              >
                <h2 className="font-serif text-2xl">
                  <Link
                    to={post.slug}
                    className="text-slate-900 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.publishedDate ? (
                  <time
                    dateTime={post.publishedDate}
                    className="mt-1 block text-sm text-slate-500"
                  >
                    {new Date(post.publishedDate).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                ) : null}
                <p className="mt-3 text-slate-700">{post.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
