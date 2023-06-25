import { parseSearchString } from './parser';

test('Simple search string', () => {
    expect(
        parseSearchString('foobar')
    ).toStrictEqual({
        queryString: 'foobar',
        filter: undefined
    });
});
