import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, ArrowRight, Database, Zap, Globe } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Database,
      title: 'Real API Data',
      description: 'Fetches data from JSONPlaceholder API with proper error handling and loading states'
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Built with modern React, TypeScript, and optimized for performance across all devices'
    },
    {
      icon: Globe,
      title: 'Production Ready',
      description: 'Clean architecture with proper routing, state management, and beautiful UI components'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">JP</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
          JSONPlaceholder
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Explorer
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          A beautiful React application showcasing posts and users from the JSONPlaceholder API
          with modern design and smooth interactions.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/posts"
          className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Posts</h3>
          <p className="text-slate-600">
            Explore 100 sample posts with detailed views, comments, and beautiful card layouts.
          </p>
        </Link>

        <Link
          to="/users"
          className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:border-purple-200 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Users</h3>
          <p className="text-slate-600">
            Browse user profiles with contact information, company details, and their posts.
          </p>
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}