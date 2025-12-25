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
      <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Blog</h2>
      <div className="w-24 h-1 bg-blue-600 mb-8"></div>
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button onClick={() => setTag(null)} className={`px-4 py-2 rounded-lg font-medium transition ${!tag ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>All</button>
          {tags.map(t => (
            <button key={t} onClick={() => setTag(t)} className={`px-4 py-2 rounded-lg font-medium transition ${tag===t ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{t}</button>
          ))}
        </div>
      )}

      {shown.length === 0 && <p className="text-gray-600 dark:text-gray-400 text-lg">No posts yet.</p>}
      <ul className="space-y-6">
        {shown.map(p => (
          <li key={p.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition dark:bg-gray-800/50">
            <Link to={`/blog/${p.slug}`} className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">{p.title}</Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{p.date}</p>
            {p.excerpt && <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{p.excerpt}</p>}
            {p.tags && p.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{p.tags.map(t => <span key={t} className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">{t}</span>)}</div>}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">Prev</button>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">Next</button>
      </div>
    </section>
  );
}
