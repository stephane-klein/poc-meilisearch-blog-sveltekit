import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { MeiliSearch } from 'meilisearch';
import sanitizeHtml from 'sanitize-html';

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
    ],
    displayedAttributes: [
        'title',
        'tags',
        'body_html',
        'date'
    ]
});


const posts = require('./posts.json');
posts.forEach((item) => {
    client.index('posts').addDocuments([{
        ...item,
        body: sanitizeHtml(
            item.body,
            {
                allowedTags: []
            }
        ),
        body_html: item.body
    }])
});
