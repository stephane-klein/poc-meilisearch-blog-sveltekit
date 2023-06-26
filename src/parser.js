export function parseSearchString(q) {
    const splited = q.split(' ');

    const tags = splited.filter(
        chunk => chunk.startsWith('#')
    ).map(
        tag => tag.substr(1)
    );

    const quotedTags = tags.map(tag => `"${tag}"`);

    return {
        queryString: splited.filter(
            chunk => (chunk != '') && (!chunk.startsWith('#'))
        ).join(' '),
        filter: (
            tags.length
            ? `tags IN [${quotedTags.join(',')}]`
            : undefined
        ),
        tags: tags
    };
}
