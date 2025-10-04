import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../components/common/Card';
import {ChatWithPDFIcon, AICalculatorIcon, DiagramInterpreterIcon ,  TranslatorIcon,
  CodeIcon,
  MicIcon, } from '../constants';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFeatures) {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const handleScrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { name: 'Chat with PDF', description: 'Ask questions about your documents and get intelligent answers. Our AI understands context and provides accurate responses.', link: '/chat-with-pdf', Icon: ChatWithPDFIcon, iconBg: 'bg-purple-100', iconText: 'text-purple-500' },
    { name: 'AI Calculator', description: 'Perform complex calculations and get instant results with our AI-powered calculator that understands natural language.', link: '/ai-calculator', Icon: AICalculatorIcon, iconBg: 'bg-green-100', iconText: 'text-green-500' },
    { name: 'Diagram Interpreter', description: 'Extract meaning from charts, diagrams, and visual content with AI that understands and explains complex visuals.', link: '/diagram-interpreter', Icon: DiagramInterpreterIcon, iconBg: 'bg-yellow-100', iconText: 'text-yellow-500' },
 {
      name: 'Translator',
      description:
        'Translate your text or documents instantly into multiple languages with high accuracy.',
      link: '/translator',
      Icon: TranslatorIcon,
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-500',
    },
    {
      name: 'Code Interpreter',
      description:
        'Analyze, debug, and improve your code with AI explanations and suggestions.',
      link: '/code-interpreter',
      Icon: CodeIcon,
      iconBg: 'bg-red-100',
      iconText: 'text-red-500',
    },
    
  ];

  const testimonials = [
      { name: 'Alex Johnson', role: 'Researcher', quote: 'ArtDocAI has revolutionized how I interact with academic papers. The Chat with PDF feature is a game-changer for analysis.' },
      { name: 'Samantha Lee', role: 'Project Manager', quote: 'The diagram interpreter saved my team hours of work. We can now understand complex schemas instantly.'},
      { name: 'David Chen', role: 'Student', quote: 'Compressing my portfolio for submissions used to be a headache. Now it\'s a one-click process with incredible quality retention.'}
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Unlock the Power of Your Documents with <span className="text-cyan-500">ArtDocAI</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          An advanced suite of AI-driven tools focused on document management. Transform documents through intelligent conversion, analysis, and interaction.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/chat-with-pdf" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Try Chat with PDF
          </Link>
          <a href="#features" onClick={handleScrollToFeatures} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 border border-gray-300 cursor-pointer">
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            A Tool for Every Need
          </h2>
          <p className="mt-2 text-gray-500">
            ArtDocAI is committed to simplifying workflows and unlocking new
            possibilities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link to={feature.link} key={feature.name} className="block">
              <Card className="h-full hover:border-cyan-400 hover:shadow-lg transition-all duration-300 cursor-pointer p-6 space-y-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.iconBg}`}
                >
                  <feature.Icon className={`w-6 h-6 ${feature.iconText}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  {feature.name}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </Card>
            </Link>
          ))}
        
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Loved by Professionals
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <p className="text-gray-600 flex-grow">"{testimonial.quote}"</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-cyan-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Ready to Dive In?
        </h2>
        <p className="mt-2 max-w-xl mx-auto text-gray-600">
          Explore the future of document management today. ArtDocAI is designed
          with precision and care to elevate your productivity.
        </p>
        <div className="mt-8">
          <Link
            to="/chat-with-pdf"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};


export default HomePage;