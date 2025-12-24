import React from 'react';
import { useParams } from 'react-router-dom';
import Blog from './Blog';

export default function TagPage() {
  const { tag } = useParams();
  return <Blog initialTag={tag} />;
}
