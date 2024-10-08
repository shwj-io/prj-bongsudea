const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// 스케줄러 불러오기
require('./scheduler');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(4000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4000');
  });
});
