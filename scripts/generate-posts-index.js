const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'public', 'posts');
const outFile = path.join(postsDir, 'index.json');

function generateIndex() {
  if (!fs.existsSync(postsDir)) {
    console.log('No posts directory found, creating:', postsDir);
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const posts = files.map(filename => {
    const filePath = path.join(postsDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.md$/, '');
    // fallback excerpt: first paragraph
    let excerpt = data.excerpt || null;
    if (!excerpt) {
      const m = content.trim().split(/\n\n+/)[0];
      excerpt = m ? m.replace(/\n/g, ' ').slice(0, 200) : null;
    }
    return {
      slug,
      title: data.title || slug,
      date: data.date || null,
      excerpt: excerpt,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      path: `/posts/${filename}`
    };
  }).sort((a,b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log('Generated posts index:', outFile);
}

generateIndex();
