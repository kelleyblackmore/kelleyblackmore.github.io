import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

export default function Post() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    if (!slug) return;
    fetch(`/posts/${slug}.md`)
      .then(r => r.text())
      .then(raw => {
        const { data, content } = matter(raw);
        setMeta(data || {});
        setContent(content);
      })
      .catch(() => {
        setContent('# Post not found');
      });
  }, [slug]);

  if (!content) return <div className="max-w-4xl mx-auto py-20 px-4">Loading...</div>;

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-20 px-4">
      <h1>{meta.title}</h1>
      {meta.date && <p className="text-sm text-gray-500">{meta.date}</p>}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
