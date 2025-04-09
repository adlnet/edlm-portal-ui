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
    
    if (pathname.startsWith('/edlm-portal/_next/')) {
      const newPath = pathname.replace('/edlm-portal/_next/', '/_next/');
      parsedUrl.pathname = newPath;
    }

    if (pathname.startsWith('/edlm-portal/api/')) {
      const newPath = pathname.replace('/edlm-portal/api/', '/api/');
      parsedUrl.pathname = newPath;
    }
    
    if (pathname.startsWith('/edlm-portal/') && 
        !pathname.startsWith('/edlm-portal/_next/') && 
        !pathname.startsWith('/edlm-portal/api/')) {
      
      const route = pathname.replace('/edlm-portal', '');
      parsedUrl.pathname = route || '/';
    }
    
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready!');
  });
});