import { MeiliSearch } from 'meilisearch';

export async function load(event) {
    console.log('event.request');
    console.log(event.url.searchParams.get('tags'));
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    if (event.locals?.data) {
        return event.locals?.data;
    } else {
        return await client.index('posts').search(
            '',
            {
                filter: (
                    event.url.searchParams.has('tags')
                    ? `tags = "${event.url.searchParams.get('tags')}"`
                    : undefined
                )
            }
        );
    }
}

export const actions = {
    default: async(event) => {
        console.log(event.url);
        const data = await event.request.formData();
        const client = new MeiliSearch({ host: 'http://localhost:7700' });

        event.locals.data = client.index('posts').search(
            data.get('search'),
            {
                attributesToHighlight: ['*']
            }
        );
        return event.locals.data;
    }
};
