import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

// Simple local stubs for Card, CardContent, and Button
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

export default function PortfolioWebsite() {
  // Example of how we might use viewport scroll for subtle effects
  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <motion.div
      className="min-h-screen w-full bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 bg-white shadow py-4 mb-6">
        <h1 className="text-4xl font-bold text-center">My Portfolio</h1>
        <p className="text-center text-gray-600">Welcome to my personal website!</p>
      </header>

      {/* ABOUT, SKILLS, CONTACT SECTION */}
      <section className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">About Me</h2>
              <p className="text-gray-700">
                I'm a passionate developer who loves building interactive web apps.
                I enjoy exploring new technologies and creating delightful user experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <ul className="list-disc ml-4 text-gray-700">
                <li>React &amp; Tailwind CSS</li>
                <li>Node.js &amp; Express</li>
                <li>JavaScript/TypeScript</li>
                <li>REST APIs &amp; GraphQL</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <p className="text-gray-700 mb-2">Feel free to reach me at:</p>
              <Button>
                <a href="mailto:youremail@example.com">Email Me</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="p-6 md:p-12 bg-gradient-to-r from-white to-gray-50">
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Job Title 1</h3>
              <p className="text-gray-700 mb-2">Company Name | 2020 - 2022</p>
              <p className="text-gray-700">
                Brief description of your responsibilities, achievements, and technologies used.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Job Title 2</h3>
              <p className="text-gray-700 mb-2">Another Company | 2022 - Present</p>
              <p className="text-gray-700">
                Another brief description of your responsibilities, achievements, and tech used.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="p-6 md:p-12">
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Project One</h3>
              <p className="text-gray-700">
                A brief description of your project, why it was built, and any exciting
                features.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Project Two</h3>
              <p className="text-gray-700">
                Another interesting project. Include a link to the repo or a live demo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="p-6 md:p-12 bg-gradient-to-l from-gray-50 to-white">
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Blog Posts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Blog Post One</h3>
              <p className="text-gray-700">
                A short intro to your blog post. Maybe share some insights or a brief overview.
              </p>
              <Button>Read More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Blog Post Two</h3>
              <p className="text-gray-700">
                Another short intro. Provide enough details to pique interest, but not too much.
              </p>
              <Button>Read More</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="p-6 md:p-12">
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p className="text-gray-700 italic">
                "This developer is awesome! They built my website with incredible detail and skill."
              </p>
              <p className="mt-2 text-right text-gray-700">— Happy Client</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-gray-700 italic">
                "Excellent work ethic and great communication. Highly recommended!"
              </p>
              <p className="mt-2 text-right text-gray-700">— Another Client</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="text-center mt-8 p-4 text-gray-400">
        <p>© 2025 Your Name. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

// Deployment Instructions for GitHub Pages:
// 1. In your package.json, add: "homepage": "https://<your-username>.github.io/<repo-name>"
// 2. Install gh-pages: npm install --save-dev gh-pages
// 3. Add deploy scripts in package.json:
//    "scripts": {
//       "predeploy": "npm run build",
//       "deploy": "gh-pages -d dist"
//    }
// 4. Run npm run deploy
