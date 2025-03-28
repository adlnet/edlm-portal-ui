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

    if (pathname.startsWith('/_next/image')) {
      console.log('req url:', req.url);
      const imageUrl = parsedUrl.query.url;
      // I'm trying to see if I can replace the image URL with the one
      if (imageUrl) {
        if (imageUrl.startsWith('/edlm-portal/_next/')) {
          parsedUrl.query.url = imageUrl.replace('/edlm-portal/_next/', '/_next/');
        } 
        else if (imageUrl.startsWith('/edlm-portal/')) {
          parsedUrl.query.url = imageUrl.replace('/edlm-portal/', '/');
        }
        else if (imageUrl.includes('/edlm-portal/')) {
          parsedUrl.query.url = imageUrl.replace('/edlm-portal/', '/');
        }

      }
    }
    
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready!');
  });
});