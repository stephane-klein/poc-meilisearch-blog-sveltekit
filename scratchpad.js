import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://localhost:7700' });

const result = await client.index('posts').search(
    'première',
    {
        attributesToHighlight: ['*'],
        filter: `tags IN ["foret-de-bouleaux"]`
    }
);

console.log(result);
