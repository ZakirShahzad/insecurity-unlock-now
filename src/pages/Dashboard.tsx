import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Eye, Users, Shield, TrendingUp, Calendar, MessageSquare, Settings, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [analysisProgress] = useState(78);
  const insights = [{
    title: "Core Pattern Identified",
    description: "You tend to avoid conflict by people-pleasing, which leads to internal resentment.",
    icon: <Brain className="h-5 w-5 text-mind-purple-400" />,
    severity: "High Impact",
    color: "border-l-red-500"
  }, {
    title: "Relationship Dynamic",
    description: "You attract partners who need 'fixing' - this stems from your childhood caretaker role.",
    icon: <Users className="h-5 w-5 text-mind-blue-400" />,
    severity: "Medium Impact",
    color: "border-l-yellow-500"
  }, {
    title: "Success Sabotage",
    description: "Fear of outshining others causes you to dim your achievements.",
    icon: <Eye className="h-5 w-5 text-mind-purple-400" />,
    severity: "High Impact",
    color: "border-l-red-500"
  }];
  const sessions = [{
    date: "Dec 24",
    topic: "Childhood Patterns",
    duration: "45 min",
    status: "Completed"
  }, {
    date: "Dec 22",
    topic: "Relationship Analysis",
    duration: "38 min",
    status: "Completed"
  }, {
    date: "Dec 20",
    topic: "Career Blocks",
    duration: "52 min",
    status: "Completed"
  }, {
    date: "Dec 18",
    topic: "Self-Worth Deep Dive",
    duration: "41 min",
    status: "In Progress"
  }];
  return (
    <div className="min-h-screen bg-gradient-to-br from-mind-blue-50 via-white to-mind-purple-50">
      {/* Header */}
      <header className="border-b border-mind-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-mind-blue-500 to-mind-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 bg-clip-text text-transparent">
              MindMirror
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-mind-blue-200 text-mind-blue-700 hover:bg-mind-blue-50">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="border-mind-purple-200 text-mind-purple-700 hover:bg-mind-purple-50">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="border-mind-blue-200 text-mind-blue-700 hover:bg-mind-blue-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold mb-2 bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 bg-clip-text text-transparent">Welcome back, Sarah</h1>
          <p className="text-gray-600 text-lg">Your journey of self-discovery continues...</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">Analysis Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Psychological Profile</span>
                  <span className="text-mind-purple-600">{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Breakthroughs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">12</div>
              <p className="text-gray-500 text-sm">Major insights discovered</p>
            </CardContent>
          </Card>

          <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-mind-blue-500" />
                Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mind-blue-600 mb-1">8</div>
              <p className="text-gray-500 text-sm">Deep analysis sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="bg-white/80 border border-mind-blue-200">
            <TabsTrigger value="insights" className="data-[state=active]:bg-mind-blue-100 data-[state=active]:text-mind-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              Key Insights
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-mind-blue-100 data-[state=active]:text-mind-blue-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-mind-blue-100 data-[state=active]:text-mind-blue-700">
              <Brain className="h-4 w-4 mr-2" />
              Patterns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold text-gray-800">Your Key Psychological Insights</h2>
              <Button className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white">
                Generate New Analysis
              </Button>
            </div>
            
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className={`border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg border-l-4 ${insight.color}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {insight.icon}
                        <div>
                          <CardTitle className="text-lg text-gray-800">{insight.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs border-gray-300 text-gray-600">
                            {insight.severity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {insight.description}
                    </CardDescription>
                    <Button variant="outline" size="sm" className="mt-3 border-mind-blue-200 text-mind-blue-700 hover:bg-mind-blue-50">
                      Explore Deeper
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold text-gray-800">Recent Sessions</h2>
              <Button className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white">
                Start New Session
              </Button>
            </div>
            
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <Card key={index} className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-mind-blue-100 to-mind-purple-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-mind-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.topic}</h3>
                          <p className="text-sm text-gray-500">{session.date} • {session.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={session.status === 'Completed' ? 'default' : 'secondary'} className="bg-mind-blue-100 text-mind-blue-700 border-mind-blue-200">
                          {session.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-mind-blue-200 text-mind-blue-700 hover:bg-mind-blue-50">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold text-gray-800">Behavioral Patterns</h2>
              <Button className="bg-gradient-to-r from-mind-blue-600 to-mind-purple-600 hover:from-mind-blue-700 hover:to-mind-purple-700 text-white">
                Deep Pattern Analysis
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-mind-blue-500" />
                    Defense Mechanisms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">People Pleasing</span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Perfectionism</span>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avoidance</span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-mind-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-mind-purple-500" />
                    Relationship Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Caretaker Role</span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">Dominant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Boundary Issues</span>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Attachment Style</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Anxious</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
