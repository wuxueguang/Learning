import 'piral/polyfills';
import { renderInstance } from 'piral';
import { layout, errors } from './layout';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'http://localhost:7778/static/pilet.json';

renderInstance({
  layout,
  errors,
  requestPilets() {
    return Promise.resolve([{
      "name": "team-blue",
      "version": "1.0.0",
      "description": "The functionality brought in by team blue.",
      "author": {
      "name": "",
      "email": ""
      },
      "link": "http://localhost:1111/index.236efb3ce8e9c7a5921b.js",
      "hash": "d70c76862ea69f64344417839a8e8f11"
    }]);
  },
});