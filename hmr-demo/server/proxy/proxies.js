
const items = module.exports = new Map;


/**
 * {
 *  method
 *  headers
 *
 *  url
 *  host
 *  match
 *  map
 *  filter
 * }
 */

items.set(/^\/proxied\/3001\//, {

  method: 'get',
  headers: {test: 'test', cookie: 'sdfsdf'},

  host: 'http://localhost:3002',
  map: path => path.replace('/proxied/3001', '/api'),
});
