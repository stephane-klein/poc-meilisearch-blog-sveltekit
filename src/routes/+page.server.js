import { MeiliSearch } from 'meilisearch';
import { parseSearchString } from './../parser';

export async function load(event) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    const {queryString, filter} = parseSearchString(
        event.url.searchParams.has('q')
            ? event.url.searchParams.get('q')
            : ''
    );

    if (event.locals?.data) {
        return event.locals?.data;
    } else {
        return await client.index('posts').search(
            queryString,
            {
                attributesToHighlight: [
                    'title',
                    'body_html'
                ],
                highlightPreTag: '<span class="bg-yellow-200">',
                highlightPostTag: '</span>',
                filter: filter
            }
        );
    }
}

export const actions = {
    default: async(event) => {
        const data = await event.request.formData();
        const client = new MeiliSearch({ host: 'http://localhost:7700' });

        const {queryString, filter} = parseSearchString(data.get('search'));

        event.locals.data = await client.index('posts').search(
            queryString,
            {
                attributesToHighlight: [
                    'title',
                    'body_html'
                ],
                highlightPreTag: '<span class="bg-yellow-200">',
                highlightPostTag: '</span>',
                filter: filter
            }
        );
        return event.locals.data;
    }
};
