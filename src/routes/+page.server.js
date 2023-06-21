import { MeiliSearch } from 'meilisearch';

export async function load(event) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    if (event.locals?.data) {
        return event.locals?.data;
    } else {
        return await client.index('posts').search('');
    }
}

export const actions = {
    default: async(event) => {
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
