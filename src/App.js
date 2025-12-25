import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Post from './components/Post';
import TagPage from './components/TagPage';
import ProjectsPage from './components/ProjectsPage';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50 border-b border-gray-200 dark:border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">Kelley Blackmore</Link>
          <div className="space-x-6">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>

      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} Kelley Blackmore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
