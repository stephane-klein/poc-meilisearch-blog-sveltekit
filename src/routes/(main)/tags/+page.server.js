import { MeiliSearch } from 'meilisearch';

export async function load() {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    return await client.index('posts').search(
        '',
        {
            facets: ['tags'],
            limit: 0
        }
    );
}
