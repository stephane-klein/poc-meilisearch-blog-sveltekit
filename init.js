import { MeiliSearch } from 'meilisearch';
import yaml from 'js-yaml';
import fs from 'fs';

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
        'body',
        'date'
    ]
});

try {
    const posts = yaml.load(fs.readFileSync('./posts.yaml', 'utf8'));
    posts.forEach((item) => {
        client.index('posts').addDocuments([item])
    });
} catch (e) {
    console.log(e);
}

