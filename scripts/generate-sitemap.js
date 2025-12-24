const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'public', 'posts');
const indexFile = path.join(postsDir, 'index.json');
const outFile = path.join(__dirname, '..', 'public', 'sitemap.xml');

function buildSitemap() {
  const siteUrl = 'https://kelleyblackmore.github.io';

  const urls = [
    '/',
    '/blog'
  ];

  if (fs.existsSync(indexFile)) {
    const posts = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
    posts.forEach(p => {
      urls.push(`/blog/${p.slug}`);
    });
  }

  const items = urls.map(u => `  <url><loc>${siteUrl}${u}</loc></url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;

  fs.writeFileSync(outFile, xml);
  console.log('Generated sitemap at', outFile);
}

buildSitemap();
