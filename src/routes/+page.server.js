import { MeiliSearch } from 'meilisearch';

export async function load(event) {
    const client = new MeiliSearch({ host: 'http://localhost:7700' });

    return await client.index('posts').search(event.locals?.search);
}

export const actions = {
    default: async(event) => {
        const data = await event.request.formData();
        event.locals.search = data.get('search');
    }
};
