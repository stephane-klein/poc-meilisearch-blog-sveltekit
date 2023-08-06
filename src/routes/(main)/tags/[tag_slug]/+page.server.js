import { MeiliSearch } from 'meilisearch';

export async function load({ params }) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    return await client.index('posts').search(
        '',
        {
            filter: `tags IN ["${params.tag_slug}"]`,
            sort: ['date:asc']
        }
    );
}
