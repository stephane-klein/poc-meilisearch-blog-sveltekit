export function parseSearchString(q) {
    // const regex = new RegExp('(?<tags>[#][^\\s]*)', 'gm');
    const splited = q.split(' ');

    const tags = splited.filter(
        chunk => chunk.startsWith('#')
    ).map(
        tag => `"${tag.substr(1)}"`
    );
    const queryString = splited.filter(
        chunk => chunk.startsWith('#')
    ).map(
        tag => `"${tag.substr(1)}"`
    );

    return {
        queryString: splited.filter(
            chunk => (chunk != '') && (!chunk.startsWith('#'))
        ).join(' '),
        filter: (
            tags.length
            ? `tags IN [${tags.join(',')}]`
            : undefined
        )
    };
}
