const { test, expect } = require('@jest/globals')
const { normalizeUrl, getURLsFromHTML } = require('./crawl.js')

test('normalizeUrl Test 1', () => {
  expect(normalizeUrl("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('normalizeUrl Test 2', () => {
  expect(normalizeUrl("http://blog.boot.DEV/path")).toBe("blog.boot.dev/path")
})

test('normalizeUrl Test 3', () => {
  expect(normalizeUrl("https://BLOG.boot.dev/path/test")).toBe("blog.boot.dev/path/test")
})

test('normalizeUrl Test 4', () => {
  expect(normalizeUrl("http://blog.boot.dev/path/test/")).toBe("blog.boot.dev/path/test")
})

test('getURLsFromHTML Test 1', () => {
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
  const inputURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML Test 2', () => {
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const inputURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML Test 3', () => {
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const inputURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML Test 4', () => {
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const inputURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})


