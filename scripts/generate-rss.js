const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'public', 'posts');
const indexFile = path.join(postsDir, 'index.json');
const outFile = path.join(__dirname, '..', 'public', 'rss.xml');

function buildRss() {
  if (!fs.existsSync(indexFile)) {
    console.log('No posts index found, run generate-posts-index first');
    return;
  }
  const posts = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  const siteUrl = 'https://kelleyblackmore.github.io';
  const items = posts.map(p => {
    const md = fs.readFileSync(path.join(postsDir, `${p.slug}.md`), 'utf8');
    const { content } = matter(md);
    const description = p.excerpt || content.split('\n\n')[0].slice(0, 200);
    return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteUrl}/posts/${p.slug}.html</link>
      <pubDate>${p.date ? new Date(p.date).toUTCString() : ''}</pubDate>
      <description><![CDATA[${description}]]></description>
      <guid>${siteUrl}/posts/${p.slug}</guid>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Kelley Blackmore — Blog</title>
      <link>${siteUrl}</link>
      <description>Updates and project notes</description>
      ${items}
    </channel>
  </rss>`;

  fs.writeFileSync(outFile, rss);
  console.log('Generated RSS at', outFile);
}

buildRss();
