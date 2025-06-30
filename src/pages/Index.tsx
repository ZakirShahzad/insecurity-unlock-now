
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Eye, Users, Shield, Star, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleEarlyAccess = () => {
    if (email) {
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when MindMirror launches. Get ready to discover your true self.",
      });
      setEmail('');
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Executive", 
      content: "I finally understand why I procrastinate. MindMirror revealed patterns I never noticed.",
      rating: 5
    },
    {
      name: "David L.",
      role: "Entrepreneur",
      content: "This changed everything. I now know my triggers and how to work with them, not against them.",
      rating: 5
    },
    {
      name: "Emma R.",
      role: "Teacher",
      content: "I've tried therapy, books, courses... nothing revealed my blind spots like this AI did.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-mind-purple-400" />,
      title: "Subconscious Pattern Analysis",
      description: "Our AI identifies hidden behavioral patterns that sabotage your success and happiness."
    },
    {
      icon: <Eye className="h-8 w-8 text-mind-blue-400" />,
      title: "Blind Spot Detection",
      description: "Discover what you can't see about yourself - the unconscious habits holding you back."
    },
    {
      icon: <Users className="h-8 w-8 text-mind-purple-400" />,
      title: "Relationship Insights",
      description: "Understand your attachment style and why you attract certain people into your life."
    },
    {
      icon: <Shield className="h-8 w-8 text-mind-blue-400" />,
      title: "Defense Mechanism Map",
      description: "Learn how your mind protects you - and when that protection becomes self-sabotage."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 font-inter text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-mind-blue-500 to-mind-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-mind-blue-400 to-mind-purple-400 bg-clip-text text-transparent">
              MindMirror
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="animate-pulse-glow bg-slate-800 text-purple-300 border-purple-500/30">
              Early Access
            </Badge>
            <Link to="/dashboard">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-mind-blue-900/50 to-mind-purple-900/50 text-purple-300 border-purple-500/30">
              🧠 Powered by Advanced Psychology AI
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-100 via-mind-blue-300 to-mind-purple-300 bg-clip-text text-transparent leading-tight">
              What if u could see
              <br />
              <span className="italic">your own blind spots?</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Most people go through life wondering <strong className="text-white">"Why do I keep doing this?"</strong><br />
              MindMirror reveals the hidden patterns sabotaging your happiness and success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg py-3 border-2 border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-mind-purple-400"
              />
              <Button 
                onClick={handleEarlyAccess}
                size="lg" 
                className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-slate-400 mb-16">
              Join 2,847 people discovering their hidden potential
            </p>
          </div>

          {/* Problem Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-20 border border-slate-700/50 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-slate-100">
              You know something's holding you back...
              <br />
              <span className="text-mind-purple-400">but you can't figure out what</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">You repeat the same mistakes in relationships</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">You procrastinate on things that matter most</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">You sabotage yourself right before success</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">You feel stuck despite trying everything</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">Others seem to "get it" while you struggle</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mind-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300 text-lg">You react in ways you later regret</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-slate-100">
              Finally understand <span className="text-mind-purple-400 italic">yourself</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our AI analyzes your thoughts, behaviors, and patterns to create a complete psychological profile
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-700/50 shadow-lg bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <CardTitle className="text-xl font-semibold text-slate-100">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-slate-100">
              People are having <span className="text-mind-blue-400 italic">breakthroughs</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-700/50 shadow-lg bg-slate-800/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-300 text-base italic leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-slate-100">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-mind-blue-600 to-mind-purple-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white">
            Stop wondering "What's wrong with me?"
            <br />
            <span className="italic">Start understanding who you are.</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of people who've broken free from their unconscious patterns and created the life they actually want.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg py-3 bg-white/90 border-0 text-slate-900"
            />
            <Button 
              onClick={handleEarlyAccess}
              size="lg" 
              className="bg-white text-mind-purple-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No commitment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-mind-blue-500 to-mind-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-mind-blue-400 to-mind-purple-400 bg-clip-text text-transparent">
              MindMirror
            </span>
          </div>
          <p className="text-slate-400 mb-4">
            Discover your hidden potential through AI-powered psychological insights
          </p>
          <p className="text-slate-500 text-sm">
            © 2024 MindMirror. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
