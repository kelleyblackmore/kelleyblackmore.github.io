import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blog({ initialTag = null }) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState(initialTag);
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    fetch('/posts/index.json')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  const tags = Array.from(new Set(posts.flatMap(p => p.tags || [])));
  const filtered = tag ? posts.filter(p => (p.tags || []).includes(tag)) : posts;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [tag]);

  // If initialTag changes (route), update tag state
  useEffect(() => {
    setTag(initialTag);
  }, [initialTag]);

  return (
    <section className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-6">Blog</h2>
      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={() => setTag(null)} className={`px-3 py-1 rounded ${!tag ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>All</button>
          {tags.map(t => (
            <button key={t} onClick={() => setTag(t)} className={`px-3 py-1 rounded ${tag===t ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{t}</button>
          ))}
        </div>
      )}

      {shown.length === 0 && <p>No posts yet.</p>}
      <ul className="space-y-4">
        {shown.map(p => (
          <li key={p.slug} className="border rounded p-4">
            <Link to={`/blog/${p.slug}`} className="text-xl font-semibold hover:text-blue-600">{p.title}</Link>
            <p className="text-sm text-gray-500">{p.date}</p>
            {p.excerpt && <p className="mt-2 text-gray-700 dark:text-gray-300">{p.excerpt}</p>}
            {p.tags && p.tags.length > 0 && <p className="mt-2 text-sm">{p.tags.map(t => <span key={t} className="mr-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{t}</span>)}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Next</button>
      </div>
    </section>
  );
}
