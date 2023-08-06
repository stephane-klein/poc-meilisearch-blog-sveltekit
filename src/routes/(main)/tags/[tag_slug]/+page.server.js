import { MeiliSearch } from 'meilisearch';

export async function load({ params }) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    return {
        tag_slug: params.tag_slug,
        posts: await client.index('posts').search(
            '',
            {
                filter: `tags IN ["${params.tag_slug}"]`,
                sort: ['date:asc']
            }
        )
    }
}
