"use client";
import React, { useState } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, FileText, Calendar, MessageSquare, TrendingUp, CheckCircle2, Clock, HandHeart, FolderOpen } from 'lucide-react';

export default function ClientPortalPage() {
    const { user } = useGlobal();
    const [activeTab, setActiveTab] = useState<'hello-client' | 'project-plan'>('hello-client');

    // Mock client data
    const clientData = {
        name: "Acme Corporation",
        projectType: "Digital Marketing Strategy",
        consultant: "Sarah Johnson",
        startDate: "2024-08-01",
        service: "Complete Digital Marketing Transformation",
        location: "San Francisco, CA"
    };

    // Mock milestone data
    const milestones = [
        { id: 1, title: "Project Kickoff & Strategy Session", date: "2024-08-01", status: "completed", description: "Initial strategy alignment and goal setting" },
        { id: 2, title: "Market Research & Competitor Analysis", date: "2024-08-06", status: "completed", description: "Comprehensive market research and competitive landscape analysis" },
        { id: 3, title: "Brand Positioning Workshop", date: "2024-08-10", status: "in-progress", description: "Define unique value proposition and brand messaging" },
        { id: 4, title: "Digital Asset Audit", date: "2024-08-15", status: "pending", description: "Review current digital assets and identify improvement areas" },
        { id: 5, title: "Content Strategy Development", date: "2024-08-20", status: "pending", description: "Create comprehensive content calendar and strategy" },
        { id: 6, title: "Campaign Launch & Optimization", date: "2024-08-30", status: "pending", description: "Launch initial campaigns with performance monitoring" }
    ];

    // Mock communications data
    const communications = [
        { id: 1, type: "email", date: "2024-08-05", subject: "Weekly Progress Update", preview: "Great progress this week on market research...", status: "unread" },
        { id: 2, type: "meeting", date: "2024-08-03", subject: "Strategy Session Follow-up", preview: "Key takeaways from our kickoff meeting...", status: "read" },
        { id: 3, type: "document", date: "2024-08-01", subject: "Project Proposal & Timeline", preview: "Complete project overview and deliverables...", status: "read" }
    ];

    const tabs = [
        { key: 'hello-client' as const, name: 'Hello Client', icon: HandHeart },
        { key: 'project-plan' as const, name: 'Project Plan', icon: FolderOpen }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
            case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
            case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
            default: return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Card - Always Visible */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-xl">{clientData.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                                {clientData.projectType} • Consultant: {clientData.consultant}
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Project Started</p>
                            <p className="text-sm text-gray-600">{new Date(clientData.startDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

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
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <HandHeart className="h-5 w-5 text-blue-600" />
                                <CardTitle>Hello Client!</CardTitle>
                            </div>
                            <CardDescription>
                                Hey there! Use this portal to track your project, communicate with us, and confirm project delivery. Scroll below for more details...
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Congratulations Section */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="text-2xl">🎉</span>
                                        <h3 className="text-lg font-semibold text-gray-900">Congratulations</h3>
                                    </div>
                                    <p className="text-gray-700 mb-4">
                                        We are excited to serve you! We offer {clientData.service} to {clientData.name} in {clientData.location}. 
                                        This page is a summary of how we work and what you can expect.
                                    </p>

                                    {/* Project Overview Card */}
                                    <div className="bg-gray-50 rounded-lg p-6 border">
                                        <div className="aspect-video bg-white rounded border flex items-center justify-center text-gray-400">
                                            <div className="text-center">
                                                <FileText className="h-16 w-16 mx-auto mb-2 opacity-50" />
                                                <p className="text-sm">Project Overview Document</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* What's Next Section */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="text-2xl">🚀</span>
                                        <h3 className="text-lg font-semibold text-gray-900">What is Next?</h3>
                                    </div>
                                    <p className="text-gray-700 mb-4">
                                        Please review your project plan. We created it just for you. Review your project status now at the button below
                                    </p>
                                    <Button 
                                        onClick={() => setActiveTab('project-plan')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Project Plan
                                    </Button>
                                </div>

                                {/* About Our Company */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="text-2xl">🏢</span>
                                        <h3 className="text-lg font-semibold text-gray-900">About Our Company</h3>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
                                        <div className="aspect-video bg-white rounded border flex items-center justify-center mb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <HandHeart className="h-8 w-8 text-blue-600" />
                                                </div>
                                                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <TrendingUp className="h-8 w-8 text-purple-600" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-700 leading-relaxed">
                                                "We help ambitious businesses transform their digital presence and accelerate growth 
                                                through proven marketing strategies and innovative solutions. Our team combines creative 
                                                thinking with data-driven insights to deliver exceptional results that exceed expectations."
                                            </p>
                                            <p className="text-sm text-blue-600 font-medium mt-2">
                                                - Your Strategic Growth Partners
                                            </p>
                                        </div>
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
                    {/* Project Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <span>Project Milestones</span>
                            </CardTitle>
                            <CardDescription>Track the progress of your project deliverables</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {milestones.map((milestone) => (
                                    <div key={milestone.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                                        <div className="flex-shrink-0 mt-1">
                                            {getStatusIcon(milestone.status)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className={getStatusColor(milestone.status)}>
                                                        {milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </Badge>
                                                    <span className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Components that appear on both tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Project Communications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-base">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                            <span>Project Communications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {communications.map((comm) => (
                                <div key={comm.id} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex items-center justify-between mb-1">
                                        <Badge variant="outline" className="text-xs">
                                            {comm.type}
                                        </Badge>
                                        <span className="text-xs text-gray-500">{new Date(comm.date).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-1">{comm.subject}</h4>
                                    <p className="text-xs text-gray-600 line-clamp-2">{comm.preview}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-base">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>Next Steps</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">Review Brand Positioning</span>
                                </div>
                                <p className="text-xs text-blue-700">Complete the brand messaging workshop by August 12th</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-900">Prepare Digital Assets</span>
                                </div>
                                <p className="text-xs text-gray-600">Gather existing marketing materials for audit</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-900">Schedule Weekly Check-in</span>
                                </div>
                                <p className="text-xs text-gray-600">Book 30-minute progress review meeting</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Digital Marketing Strategy */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-base">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                            <span>Digital Marketing Strategy</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                                <span className="text-sm font-medium text-purple-900">SEO Optimization</span>
                                <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <span className="text-sm font-medium text-gray-900">Content Calendar</span>
                                <Badge variant="outline">Pending</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <span className="text-sm font-medium text-gray-900">Social Media Setup</span>
                                <Badge variant="outline">Planned</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <span className="text-sm font-medium text-gray-900">PPC Campaigns</span>
                                <Badge variant="outline">Phase 2</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}