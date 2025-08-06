'use client';

import { useState } from 'react';
import { clientPortalMockData } from '@/lib/mockData/clientPortal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Download, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  FileText,
  MessageSquare,
  User,
  Building2,
  ClipboardList,
  HandHeart,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
// Using built-in date formatting
const formatDate = (dateString: string, formatType: 'short' | 'long' | 'datetime' = 'long') => {
  const date = new Date(dateString);
  switch (formatType) {
    case 'short':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'datetime':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      });
    default:
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
  }
};

export default function ClientPortalDemo() {
  const [activeTab, setActiveTab] = useState<'hello-client' | 'project-plan'>('hello-client');
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set(['milestone-week-3'])); // Default expand Milestone 3
  const [milestoneSteps, setMilestoneSteps] = useState<Record<string, Array<{id: string, title: string, completed: boolean}>>>({
    'milestone-week-3': [
      { id: 'step-1', title: 'Configure lead generation forms and landing pages', completed: true },
      { id: 'step-2', title: 'Set up email automation sequences for nurturing', completed: true },
      { id: 'step-3', title: 'Launch social media campaigns across platforms', completed: true },
      { id: 'step-4', title: 'Implement tracking and analytics dashboard', completed: false },
      { id: 'step-5', title: 'Test and optimize conversion funnels', completed: false }
    ]
  });
  const { client_portal } = clientPortalMockData;

  // Toggle milestone expansion
  const toggleMilestone = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };

  // Toggle step completion
  const toggleStep = (milestoneId: string, stepId: string) => {
    setMilestoneSteps(prev => ({
      ...prev,
      [milestoneId]: (prev[milestoneId] || []).map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    }));
  };

  // Get milestone number from title
  const getMilestoneNumber = (title: string, index: number) => {
    return index + 1;
  };

  // Get milestone name (remove "Week X:" prefix)
  const getMilestoneName = (title: string) => {
    return title.replace(/^Week \d+:\s*/, '');
  };

  // Calculate steps progress
  const getStepsProgress = (milestoneId: string) => {
    const steps = milestoneSteps[milestoneId] || [];
    if (steps.length === 0) return 0;
    return Math.round((steps.filter(step => step.completed).length / steps.length) * 100);
  };

  // Get dynamic milestone status based on step completion
  const getDynamicMilestoneStatus = (milestone: any, milestoneId: string) => {
    const steps = milestoneSteps[milestoneId] || [];
    if (steps.length === 0) return milestone.status; // Use original status if no steps
    
    const progress = getStepsProgress(milestoneId);
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in_progress';
    return milestone.status; // Use original status for upcoming/pending
  };

  // ProgressBar component
  const ProgressBar = ({ percentage, color = 'bg-blue-500' }: { percentage: number; color?: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  // Step item component (similar to TaskItem pattern)
  const StepItem = ({ 
    step, 
    milestoneId,
    onToggle
  }: { 
    step: {id: string, title: string, completed: boolean};
    milestoneId: string;
    onToggle: (milestoneId: string, stepId: string) => void;
  }) => (
    <div 
      className={`flex items-start space-x-3 p-3 rounded-lg border transition-all hover:bg-gray-50 cursor-pointer ${
        step.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
      onClick={() => onToggle(milestoneId, step.id)}
    >
      <input
        type="checkbox"
        checked={step.completed}
        onChange={() => onToggle(milestoneId, step.id)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-offset-2"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex-1">
        <p className={`text-sm font-medium ${step.completed ? 'line-through text-green-600' : 'text-gray-900'}`}>
          {step.title}
        </p>
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'image':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const tabs = [
    { key: 'hello-client' as const, name: 'Hello Client', icon: HandHeart },
    { key: 'project-plan' as const, name: 'Project Plan', icon: ClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: client_portal.consultant.brand_color }}
              >
                {client_portal.consultant.company.split(' ').map(word => word[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {client_portal.client_name}!
                </h1>
                <p className="text-gray-600">{client_portal.service.title}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Building2 className="h-4 w-4" />
                    {client_portal.consultant.company}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-gray-400" />
                      {client_portal.consultant.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      {client_portal.consultant.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-gray-400" />
                      {client_portal.consultant.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.key ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Hello Client Tab */}
        {activeTab === 'hello-client' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      👋 Hello Client!
                    </h2>
                    <p className="text-lg text-gray-600">
                      Hey there! Use this portal to track your project, communicate with us, and 
                      confirm project delivery. Scroll below for more details...
                    </p>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      🎉 Congratulations
                    </h3>
                    <p className="text-gray-700 mb-6">
                      We are excited to serve you! We offer {client_portal.service.title} to {client_portal.client_name}. 
                      This page is a summary of how we work and what you can expect.
                    </p>
                    
                    {/* Placeholder for image/content area */}
                    <div className="bg-gray-100 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 italic">
                        Project overview content and visuals will be displayed here
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      📋 What is Next?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Please review your project plan. We created it just for you. Review your project status now at the button below
                    </p>
                    
                    <Button 
                      onClick={() => setActiveTab('project-plan')}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <ClipboardList className="h-4 w-4" />
                      Project Plan
                    </Button>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      🏢 About Our Company
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
                      {/* Company image placeholder */}
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-gray-400" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        &ldquo;We are specialists in helping businesses grow through strategic marketing and optimization. 
                        Our proven methodology has helped hundreds of companies achieve their goals. 
                        <span className="text-blue-600 font-medium">We focus on delivering results</span> that matter 
                        to your business, ensuring every project contributes to your long-term success.
                        
                        Our team brings years of experience and a commitment to excellence in everything we do. 
                        From strategy development to implementation, we&apos;re here to guide you through every step 
                        of your growth journey.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Project Plan Tab */}
        {activeTab === 'project-plan' && (
          <div className="space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Project Progress</span>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(client_portal.service.status.toLowerCase().replace(' ', '_'))}
                  >
                    {client_portal.service.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(client_portal.service.overall_progress * 100)}%</span>
                    </div>
                    <Progress 
                      value={client_portal.service.overall_progress * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatDate(client_portal.service.start_date, 'short')}
                      </div>
                      <div className="text-sm text-gray-600">Start Date</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {client_portal.milestones.filter(m => m.status === 'completed').length} / {client_portal.milestones.length}
                      </div>
                      <div className="text-sm text-gray-600">Milestones Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatDate(client_portal.service.end_date, 'short')}
                      </div>
                      <div className="text-sm text-gray-600">Target Completion</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestone Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {client_portal.milestones.map((milestone, index) => {
                    const isExpanded = expandedMilestones.has(milestone.id);
                    const milestoneNumber = getMilestoneNumber(milestone.title, index);
                    const milestoneName = getMilestoneName(milestone.title);
                    const steps = milestoneSteps[milestone.id] || [];
                    const stepsProgress = getStepsProgress(milestone.id);
                    const dynamicStatus = getDynamicMilestoneStatus(milestone, milestone.id);
                    
                    return (
                      <div key={milestone.id} className="relative">
                        {/* Timeline Line */}
                        {index < client_portal.milestones.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                        )}
                        
                        <div className="flex gap-4">
                          {/* Timeline Icon */}
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                              dynamicStatus === 'completed' 
                                ? 'bg-green-100 border-green-200' 
                                : dynamicStatus === 'in_progress'
                                ? 'bg-blue-100 border-blue-200'
                                : 'bg-gray-100 border-gray-200'
                            }`}>
                              {getStatusIcon(dynamicStatus)}
                            </div>
                          </div>
                          
                          {/* Milestone Content */}
                          <div className="flex-1">
                            {/* Collapsible Header */}
                            <div 
                              className={`bg-white rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                                dynamicStatus === 'in_progress' ? 'ring-2 ring-blue-200' : ''
                              } ${isExpanded ? 'rounded-b-none' : ''}`}
                              onClick={() => toggleMilestone(milestone.id)}
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {isExpanded ? (
                                      <ChevronDown className="h-5 w-5 text-gray-400" />
                                    ) : (
                                      <ChevronRight className="h-5 w-5 text-gray-400" />
                                    )}
                                    <div>
                                      <h3 className="font-semibold text-lg text-gray-900">
                                        Milestone {milestoneNumber}: {milestoneName}
                                      </h3>
                                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                        <span>Due: {formatDate(milestone.due_date)}</span>
                                        {milestone.completed_at && (
                                          <span className="text-green-600">
                                            Completed: {formatDate(milestone.completed_at)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge 
                                    variant="secondary"
                                    className={getStatusColor(dynamicStatus)}
                                  >
                                    {dynamicStatus.replace('_', ' ').toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Expandable Content */}
                            {isExpanded && (
                              <div className="bg-white border border-t-0 rounded-b-lg">
                                <div className="p-4 pt-0">
                                  <div className="space-y-4">
                                    {/* Description */}
                                    <div className="pt-4">
                                      <p className="text-sm text-gray-600">{milestone.description}</p>
                                    </div>

                                    {/* Progress Bar - Always show when there are steps */}
                                    {steps.length > 0 && (
                                      <div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                          <span>Overall Progress</span>
                                          <span>{stepsProgress}%</span>
                                        </div>
                                        <Progress value={stepsProgress} className="h-2" />
                                      </div>
                                    )}

                                    {/* Steps Section */}
                                    {steps.length > 0 && (
                                      <div className="space-y-3">
                                        <Separator />
                                        <div>
                                          <div className="mb-3">
                                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                              <ClipboardList className="h-4 w-4" />
                                              Steps ({steps.filter(s => s.completed).length}/{steps.length})
                                            </h4>
                                          </div>

                                          {/* Steps List */}
                                          <div className="space-y-2">
                                            {steps.map((step) => (
                                              <StepItem
                                                key={step.id}
                                                step={step}
                                                milestoneId={milestone.id}
                                                onToggle={toggleStep}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Documents */}
                                    {milestone.documents.length > 0 && (
                                      <div className="space-y-3">
                                        <Separator />
                                        <div>
                                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            Documents ({milestone.documents.length})
                                          </h4>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {milestone.documents.map((doc, docIndex) => (
                                              <Button
                                                key={docIndex}
                                                variant="outline"
                                                className="justify-start h-auto p-3"
                                                onClick={() => window.open(doc.url, '_blank')}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <span className="text-lg">{getFileIcon(doc.type)}</span>
                                                  <div className="text-left">
                                                    <div className="font-medium text-sm">{doc.name}</div>
                                                    <div className="text-xs text-gray-500">{doc.size}</div>
                                                  </div>
                                                  <Download className="h-4 w-4 ml-auto" />
                                                </div>
                                              </Button>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Shared Components on Both Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Project Communications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Project Communications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {client_portal.project_notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {note.author_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{note.author_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {note.created_by === 'consultant' ? 'Consultant' : 'Client'}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-auto">
                        {formatDate(note.created_at, 'datetime')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Digital Marketing Strategy Implementation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Digital Marketing Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">SEO Optimization</h4>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Technical SEO audit and on-page optimization</p>
                  <div className="mt-2">
                    <Progress value={100} className="h-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Content Marketing</h4>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Blog content and social media strategy</p>
                  <div className="mt-2">
                    <Progress value={65} className="h-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Paid Advertising</h4>
                    <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Google Ads and social media campaigns</p>
                  <div className="mt-2">
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Details Footer */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-gray-900">{client_portal.service.title}</h3>
              <p className="text-sm text-gray-600">{client_portal.service.description}</p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span>Service Type: {client_portal.service.type.toUpperCase()}</span>
                <span>•</span>
                <span>Duration: {formatDate(client_portal.service.start_date, 'short')} - {formatDate(client_portal.service.end_date)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}