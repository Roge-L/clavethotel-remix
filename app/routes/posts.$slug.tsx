import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
    params,
}: LoaderFunctionArgs): Promise<Response> => {
    return json({ slug: params.slug });
}

export default function PostSlug() {
    const { slug } = useLoaderData<typeof loader>();
    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                Some Post: {slug}
            </h1>
        </main>
    )
}