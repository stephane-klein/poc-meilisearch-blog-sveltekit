import { MeiliSearch } from 'meilisearch';
import { parseSearchString } from './../../../parser';

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
        const response = await client.index('posts').search(
            queryString,
            {
                attributesToHighlight: [
                    'title',
                    'body'
                ],
                attributesToCrop: [
                    'body'
                ],
                cropLength: 60,
                highlightPreTag: '<span class="bg-yellow-200">',
                highlightPostTag: '</span>',
                filter: filter,
                sort: ['date:asc']
            }
        );
        response.referer = event.request.headers.get('referer');
        return response;
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
                    'body'
                ],
                attributesToCrop: [
                    'body'
                ],
                cropLength: 60,
                highlightPreTag: '<span class="bg-yellow-200">',
                highlightPostTag: '</span>',
                filter: filter,
                sort: ['date:asc']
            }
        );
        return event.locals.data;
    }
};
