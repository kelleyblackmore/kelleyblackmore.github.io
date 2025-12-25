import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'Automatic-Secret-Rotation',
      description:
        'Rust built automatic secret key rotation — secure, automated key management for services.',
      technologies: ['Rust', 'Security', 'CLI'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/Automatic-Secret-Rotation',
      demo: null
    },
    {
      title: 'Portfolio Website',
      description: 'This website — a modern React + Tailwind portfolio with blog and projects.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/kelleyblackmore.github.io',
      demo: 'https://kelleyblackmore.github.io'
    },
    {
      title: 'open-webui',
      description: 'User-friendly AI interface supporting multiple backends (Ollama, OpenAI, etc.).',
      technologies: ['React', 'API', 'AI'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/open-webui',
      demo: null
    },
    {
      title: 'tictac',
      description: 'React application deployment example demonstrating cloud deployment patterns.',
      technologies: ['React', 'Deployment', 'AWS'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/tictac',
      demo: null
    },
    {
      title: 'terraform-aws-compute-ec2',
      description: 'Terraform module for AWS compute resources — opinionated EC2 provisioning.',
      technologies: ['Terraform', 'AWS', 'Infrastructure'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/terraform-aws-compute-ec2',
      demo: null
    },
    {
      title: 'goss',
      description: 'Quick and easy server testing/validation tool for infrastructure checks.',
      technologies: ['Go', 'Testing', 'CI'],
      image: '/images/placeholder.svg',
      github: 'https://github.com/kelleyblackmore/goss',
      demo: null
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            A selection of projects showcasing my experience with modern development, DevOps, and infrastructure.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = '/images/placeholder.svg'}}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      title="View on GitHub"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      title="View Live Demo"
                    >
                      <span className="sr-only">Live Demo</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6-6m0 0l-6 6" />
                      </svg>
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                      Private Repo
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 