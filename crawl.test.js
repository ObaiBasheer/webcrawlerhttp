const {normalizeUrl, getUrlFromHtml} = require('./crawl.js');
const {test,expect} = require('@jest/globals');
const {JSDOM} = require('jsdom');

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

test('getUrlFromHtml absolute', () => {
    const inputHtmlBody = `
    <html lang="ar">
        <body>
           <a href="https://blog.boot.dev/path">vlog.boot.dev</a>
        </body>
    </html>    
    
    `;
    const inputBaseUrl = `https://blog.boot.dev/path/`;
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path'];

    expect(actual).toEqual(expected)
})

test('getUrlFromHtml relative', () => {
    const inputHtmlBody = `
    <html lang="ar">
        <body>
           <a href="/path/">vlog.boot.dev</a>
        </body>
    </html>    
    
    `;
    const inputBaseUrl = `https://blog.boot.dev`;
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/'];

    expect(actual).toEqual(expected)
})

test('getUrlFromHtml both', () => {
    const inputHtmlBody = `
    <html lang="ar">
        <body>
           <a href="https://blog.boot.dev/path1/">vlog.boot.dev</a>
           <a href="/path2/">vlog.boot.dev</a>
        </body>
    </html>    
    
    `;
    const inputBaseUrl = `https://blog.boot.dev`;
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];

    expect(actual).toEqual(expected)
})

test('getUrlFromHtml Invalid', () => {
    const inputHtmlBody = `
    <html lang="ar">
        <body>
           <a href="invalid">vlog.boot.dev</a>
        </body>
    </html>    
    
    `;
    const inputBaseUrl = `https://blog.boot.dev`;
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = [];

    expect(actual).toEqual(expected)
})