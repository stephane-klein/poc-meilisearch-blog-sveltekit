import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://localhost:7700' });

let result = await client.index('posts').search(
    'p',
    {
        attributesToHighlight: ['*'],
        filter: `tags IN ["foret-de-bouleaux"]`
    }
);

console.log(result.hits[0]);
console.log(result.hits[0]._formatted);

result = await client.index('posts').getDocument(
    '/une-journee-sur-le-chemin-de-stevenson-avec-john-doe-et-son-yak/',
    {
        fields: ['id', 'title', 'body']
    }
);

console.log(result);
