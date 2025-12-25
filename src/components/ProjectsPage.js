import React from 'react';
import Projects from './Projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Projects />
      </main>
    </div>
  );
};

export default ProjectsPage;
