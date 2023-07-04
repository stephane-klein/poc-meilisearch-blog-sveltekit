import { MeiliSearch } from 'meilisearch';
import yaml from 'js-yaml';
import fs from 'fs';
import slug from 'slug';

const client = new MeiliSearch({ host: 'http://localhost:7700' });
client.createIndex('posts', { primaryKey: 'slug' })

client.index('posts').updateSettings({
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
        'body',
        'date',
        'slug'
    ]
});

try {
    const posts = yaml.load(fs.readFileSync('./posts.yaml', 'utf8'));

    posts.forEach((item) => {
        client.index('posts').addDocuments([{
            ...item,
            slug: `/${slug(item.title)}/`
        }])
    });
} catch (e) {
    console.log(e);
}

