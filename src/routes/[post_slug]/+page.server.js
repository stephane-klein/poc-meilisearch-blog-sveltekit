import { MeiliSearch } from 'meilisearch';

export async function load({ params }) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    return {
        post: await client.index('posts').getDocument(
            `/${params.post_slug}/`
        )
    };
}
