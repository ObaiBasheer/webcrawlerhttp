const {normalizeUrl} = require('./crawl.js');
const {test,expect} = require('@jest/globals');

test('normalizeUrl', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected)
})
test('normalizeUrl strip trailing slash ', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals ', () => {
    const input = 'https://BLOG.BOOT.DEV/path/';
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected)
})