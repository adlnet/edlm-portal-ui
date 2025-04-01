const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // For [LISTID] realted
    if (pathname.startsWith('/_next/') && !req.url.includes('/edlm-portal/')) {
      res.writeHead(307, { 
        'Location': `/edlm-portal${pathname}${parsedUrl.search || ''}`,
        'Cache-Control': 'no-store, no-cache',
      });
      res.end();
      return;
    }
    
    if (pathname.startsWith('/edlm-portal/_next/')) {
      const newPath = pathname.replace('/edlm-portal/_next/', '/_next/');
      parsedUrl.pathname = newPath;
    }
    
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready!');
  });
});