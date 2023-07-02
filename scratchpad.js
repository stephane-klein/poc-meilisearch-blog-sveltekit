import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://localhost:7700' });

const result = await client.index('posts').search(
    'p',
    {
        attributesToHighlight: ['*'],
        filter: `tags IN ["foret-de-bouleaux"]`
    }
);

console.log(result.hits[0]);
console.log(result.hits[0]._formatted);
