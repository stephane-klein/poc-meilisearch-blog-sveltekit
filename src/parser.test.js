import { parseSearchString } from './parser';

test('Simple search string', () => {
    expect(
        parseSearchString('foobar')
    ).toStrictEqual({
        queryString: 'foobar',
        filter: undefined
    });
});

test('Simple search string', () => {
    expect(
        parseSearchString('#tag1 foobar')
    ).toStrictEqual({
        queryString: 'foobar',
        filter: 'tags IN ["tag1"]'
    });
});

test('Simple search string', () => {
    expect(
        parseSearchString('#tag1 #tag2 foobar')
    ).toStrictEqual({
        queryString: 'foobar',
        filter: 'tags IN ["tag1","tag2"]'
    });
})
