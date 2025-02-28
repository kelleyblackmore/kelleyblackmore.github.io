// portfolio-website.jsx
// A simple React portfolio that you can host on GitHub Pages.

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PortfolioWebsite() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
        <p className="text-gray-600">Welcome to my personal website!</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700">
              I'm a passionate developer who loves building interactive web apps.
              I enjoy exploring new technologies and creating delightful user experiences.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc ml-4 text-gray-700">
              <li>React & Tailwind CSS</li>
              <li>Node.js & Express</li>
              <li>JavaScript/TypeScript</li>
              <li>REST APIs & GraphQL</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-gray-700 mb-2">Feel free to reach me at:</p>
            <Button variant="default">
              <a
                href="mailto:youremail@example.com"
                target="_blank"
                rel="noreferrer"
              >
                Email Me
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Project One</h2>
            <p className="text-gray-700">
              A brief description of your project, why it was built, and any exciting
              features.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Project Two</h2>
            <p className="text-gray-700">
              Another interesting project. Include a link to the repo or a live demo.
            </p>
          </CardContent>
        </Card>
      </section>
      <footer className="text-center mt-8 text-gray-400">
        <p>© 2025 Your Name. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}