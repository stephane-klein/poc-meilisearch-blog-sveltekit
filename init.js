import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://localhost:7700' });

client.index('movies').updateSettings({
    searchableAttributes: [
        'title',
        'body'
    ],
    filterableAttributes: [
      'tags'
    ],
    sortableAttributes: [
      'date'
    ]
});


const posts = require('./posts.json');
client.index('posts').addDocuments(posts)
  .then((res) => console.log(res));
