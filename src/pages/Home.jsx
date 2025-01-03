import React from 'react';
import { Link } from 'react-router-dom';
import { FileJson, FileCode, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: <FileJson className="h-8 w-8" />,
      title: 'JSON Support',
      description: 'Visualize and interact with JSON responses in a tree-like structure'
    },
    {
      icon: <FileCode className="h-8 w-8" />,
      title: 'XML Support',
      description: 'Parse and display XML documents with nested element visualization'
    },
    {
      icon: <Github className="h-8 w-8" />,
      title: 'Open Source',
      description: 'Free to use and open for contributions from the community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
            API Response Visualizer
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Transform complex API responses into interactive, visual representations for easier understanding and debugging.
          </p>
          <Link to="/visualizer">
            <Button size="lg" className="px-8">
              Start Visualizing
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Paste Your Response</h3>
                <p className="text-slate-600">Copy your JSON or XML response and paste it into the input area.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Visualize</h3>
                <p className="text-slate-600">Click the visualize button to transform your response into an interactive tree structure.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interact & Export</h3>
                <p className="text-slate-600">Explore the data, search for specific values, and export in various formats.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;