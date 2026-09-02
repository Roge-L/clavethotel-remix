import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
import { excerpt, renderMarkdown } from "~/lib/markdown";
import { BUSINESS, SITE_URL } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { INN_ID, breadcrumbs } from "~/lib/structured-data";

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return buildMeta({
      title: "Post not found",
      description: "This post could not be found.",
      pathname: location.pathname,
      noIndex: true,
    });
  }

  const { post, summary } = data;
  const url = `${SITE_URL}${location.pathname}`;

  return [
    ...buildMeta({
      title: post.title,
      description: summary,
      pathname: location.pathname,
      type: "article",
      image: post.featured_img ?? undefined,
      publishedTime: post.published_date ?? undefined,
      modifiedTime: post.updated_date ?? post.published_date ?? undefined,
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: summary,
        datePublished: post.published_date ?? undefined,
        dateModified: post.updated_date ?? post.published_date ?? undefined,
        image: post.featured_img ?? `${SITE_URL}/og-image.jpg`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: BUSINESS.name, "@id": INN_ID },
        publisher: { "@id": INN_ID },
      },
    },
    {
      "script:ld+json": breadcrumbs([
        { name: "News & Updates", path: "/posts" },
        { name: post.title, path: location.pathname },
      ]),
    },
  ];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug, context);
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return {
    post,
    html: renderMarkdown(post.content ?? ""),
    summary: excerpt(post.content ?? ""),
  };
}

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <article className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl text-slate-900">{post.title}</h1>
        {post.published_date ? (
          <time
            dateTime={post.published_date}
            className="mt-2 block text-sm text-slate-500"
          >
            {new Date(post.published_date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
        <div
          className="prose mt-8 max-w-none text-slate-700 [&_a]:text-slate-900 [&_a]:underline [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_li]:ml-6 [&_li]:list-disc [&_p]:mt-4"
          // Sanitized in `renderMarkdown`: raw HTML is escaped and unsafe
          // link protocols are stripped before this ever reaches the DOM.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
