'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { clientAcquisitionData } from '@/lib/mockData/clientAcquisition';
import { dream100Contacts } from '@/lib/mockData/dream100';
import { ClientAcquisitionData, IdentifyTask, AvatarSnapshot } from '@/lib/types/clientAcquisition';
import { Dream100Contact } from '@/lib/mockData/dream100';
import { Target, UserPlus, MessageCircle, Calendar, Users, TrendingUp, Clock, AlertCircle, Eye, Edit3, ExternalLink, Linkedin, Mail, Youtube, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientAcquisitionPage() {
  const [activeSection, setActiveSection] = useState<'identify' | 'invite' | 'converse'>('identify');
  const [data, setData] = useState<ClientAcquisitionData>(clientAcquisitionData);
  const [selectedContact, setSelectedContact] = useState<Dream100Contact | null>(null);

  // Progress bar component (reused from daily tasks)
  const ProgressBar = ({ percentage, color = 'bg-blue-500' }: { percentage: number; color?: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  // Task item component (adapted from daily tasks)
  const TaskItem = ({ 
    task, 
    onToggle,
    color = 'text-blue-600'
  }: { 
    task: IdentifyTask;
    onToggle: (taskId: string) => void;
    color?: string;
  }) => (
    <div 
      className={`flex items-start space-x-3 p-3 rounded-lg border transition-all hover:bg-gray-50 ${
        task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={`mt-1 h-4 w-4 rounded border-gray-300 ${color} focus:ring-2 focus:ring-offset-2`}
      />
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </p>
        {task.completed && task.completedAt && (
          <p className="text-xs text-gray-400 mt-1">
            Completed at {new Date(task.completedAt).toLocaleTimeString()}
          </p>
        )}
        {task.notes && (
          <p className="text-xs text-gray-600 mt-1 italic">
            Note: {task.notes}
          </p>
        )}
      </div>
    </div>
  );

  // Avatar snapshot component
  const AvatarSnapshot = ({ avatar }: { avatar: AvatarSnapshot }) => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-all">
          <div className="aspect-square w-16 h-16 mb-2 relative overflow-hidden rounded-md mx-auto">
            <Image
              src={avatar.imageUrl}
              alt={avatar.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium text-xs text-gray-900 mb-1 text-center line-clamp-1">{avatar.title}</h3>
          <p className="text-xs text-gray-600 line-clamp-2 text-center">{avatar.description}</p>
          <Badge variant="outline" className="mt-2 text-xs mx-auto block w-fit">
            {avatar.agency}
          </Badge>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{avatar.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-square w-32 h-32 mx-auto relative overflow-hidden rounded-lg">
            <Image
              src={avatar.imageUrl}
              alt={avatar.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <div>
              <h4 className="font-medium text-gray-900">Target Market</h4>
              <p className="text-sm text-gray-600">{avatar.targetMarket}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Description</h4>
              <p className="text-sm text-gray-600">{avatar.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Agency</h4>
              <p className="text-sm text-gray-600">{avatar.agency}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Status badge component (reused from Dream100 page)
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      'Research': { color: 'bg-gray-100 text-gray-800', icon: '🔍' },
      'Reached Out': { color: 'bg-orange-100 text-orange-800', icon: '📧' },
      'In Conversation': { color: 'bg-yellow-100 text-yellow-800', icon: '💬' },
      '2nd Meeting': { color: 'bg-blue-100 text-blue-800', icon: '🤝' },
      'Buy': { color: 'bg-green-100 text-green-800', icon: '✅' },
      "Don't Buy": { color: 'bg-red-100 text-red-800', icon: '❌' },
      'Postpone': { color: 'bg-purple-100 text-purple-800', icon: '⏸️' },
      'Referral': { color: 'bg-indigo-100 text-indigo-800', icon: '🔄' },
      'No Decision': { color: 'bg-gray-100 text-gray-600', icon: '❓' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['No Decision'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {status}
      </span>
    );
  };

  // Source icon component (reused from Dream100 page)
  const SourceIcon = ({ source }: { source: string }) => {
    const icons = {
      'LinkedIn': <Linkedin className="h-4 w-4 text-blue-600" />,
      'Email List': <Mail className="h-4 w-4 text-gray-600" />,
      'YouTube': <Youtube className="h-4 w-4 text-red-600" />,
      'Referral': <Users className="h-4 w-4 text-green-600" />
    };
    
    return icons[source as keyof typeof icons] || <MessageSquare className="h-4 w-4 text-gray-400" />;
  };

  // Format date for display (reused from Dream100 page)
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Update contact status (reused from Dream100 page)
  const updateContactStatus = (contactId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updating contact ${contactId} to status: ${newStatus}`);
  };

  // Dream 100 Stats Component - Compact 2x2 Grid Layout
  const Dream100Stats = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const totalContacts = dream100Contacts.filter(c => c.is_dream_100).length;
    const contactsByStatus = {
      research: dream100Contacts.filter(c => c.latest_decision === 'Research').length,
      contacted: dream100Contacts.filter(c => c.latest_decision === 'Reached Out').length,
      meeting: dream100Contacts.filter(c => c.latest_decision === 'In Conversation' || c.latest_decision === '2nd Meeting').length,
      buy: dream100Contacts.filter(c => c.latest_decision === 'Buy').length,
      dontBuy: dream100Contacts.filter(c => c.latest_decision === "Don't Buy").length
    };
    
    const todayContacts = dream100Contacts.filter(c => c.next_contact_date === today).length;
    const missedYesterday = dream100Contacts.filter(c => 
      c.next_contact_date === yesterday && c.last_interaction !== yesterday
    ).length;
    const overdue = dream100Contacts.filter(c => 
      c.next_contact_date && new Date(c.next_contact_date) < new Date() && c.latest_decision !== 'Buy'
    ).length;
    
    const responseRate = Math.round(
      (dream100Contacts.filter(c => c.interaction_count && c.interaction_count > 1).length / 
       dream100Contacts.filter(c => c.interaction_count && c.interaction_count > 0).length) * 100
    );

    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Row 1: Total Contacts */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-900">Dream 100 Total</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{totalContacts}</p>
          <p className="text-sm text-gray-500">Active prospects</p>
        </div>

        {/* Row 1: Status Breakdown */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-3">Contact Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Research</span>
              <Badge variant="secondary">{contactsByStatus.research}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Contacted</span>
              <Badge variant="outline">{contactsByStatus.contacted}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Meeting</span>
              <Badge variant="default">{contactsByStatus.meeting}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Converted</span>
              <Badge className="bg-green-100 text-green-800">{contactsByStatus.buy}</Badge>
            </div>
          </div>
        </div>

        {/* Row 2: Response Rate */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Response Rate</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{responseRate}%</p>
          <p className="text-sm text-gray-500">Overall engagement</p>
        </div>

        {/* Row 2: Today's Activity */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-3">Activity Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Today's Contacts</span>
              <Badge className={todayContacts === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                {todayContacts}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Missed Yesterday</span>
              <Badge className={missedYesterday === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {missedYesterday}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overdue</span>
              <Badge className={overdue === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {overdue}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dream 100 Database Views Component
  const Dream100DatabaseViews = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Hardcoded contact lists for consistent display
    // Today's Contacts - exactly 5 contacts
    const todayContacts = dream100Contacts.filter(c => [
      'contact-1', 'contact-4', 'contact-9', 'contact-12', 'contact-13'
    ].includes(c.id));
    
    // Missed Yesterday - exactly 2 contacts
    const missedYesterday = dream100Contacts.filter(c => [
      'contact-3', 'contact-6'
    ].includes(c.id));
    
    // Overdue Contacts - exactly 1 contact
    const overdue = dream100Contacts.filter(c => [
      'contact-7'
    ].includes(c.id));
    
    // This Week - keep existing logic with good variety
    const upcomingWeek = dream100Contacts.filter(c => [
      'contact-2', 'contact-10', 'contact-14', 'contact-15', 'contact-8'
    ].includes(c.id));

    return (
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Today's Contacts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span>Today's Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-green-50 rounded hover:bg-green-100 transition-colors">
                  <div className="flex-1">
                    <button 
                      onClick={() => setSelectedContact(contact)}
                      className="text-sm font-medium text-gray-900 hover:text-green-700 cursor-pointer text-left"
                    >
                      {contact.name}
                    </button>
                    <p className="text-xs text-gray-600">{contact.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {contact.latest_decision}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missed Yesterday */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span>Missed Yesterday</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {missedYesterday.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded hover:bg-yellow-100 transition-colors">
                  <div className="flex-1">
                    <button 
                      onClick={() => setSelectedContact(contact)}
                      className="text-sm font-medium text-gray-900 hover:text-yellow-700 cursor-pointer text-left"
                    >
                      {contact.name}
                    </button>
                    <p className="text-xs text-gray-600">{contact.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {contact.preferred_communication}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Contacts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4 text-red-600" />
              <span>Overdue Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdue.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-red-50 rounded hover:bg-red-100 transition-colors">
                  <div className="flex-1">
                    <button 
                      onClick={() => setSelectedContact(contact)}
                      className="text-sm font-medium text-gray-900 hover:text-red-700 cursor-pointer text-left"
                    >
                      {contact.name}
                    </button>
                    <p className="text-xs text-gray-600">Due: {contact.next_contact_date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {contact.latest_decision}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming This Week */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>This Week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingWeek.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                  <div className="flex-1">
                    <button 
                      onClick={() => setSelectedContact(contact)}
                      className="text-sm font-medium text-gray-900 hover:text-blue-700 cursor-pointer text-left"
                    >
                      {contact.name}
                    </button>
                    <p className="text-xs text-gray-600">{contact.next_contact_date || 'This week'}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {contact.conversion_probability}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Toggle task completion
  const toggleTask = (section: 'identify' | 'invite' | 'converse', taskId: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        tasks: prev[section].tasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : undefined
              }
            : task
        )
      }
    }));
  };

  // Calculate completion percentage for a section
  const getCompletionPercentage = (tasks: IdentifyTask[]) => {
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const sections = [
    { key: 'identify' as const, name: 'Identify', icon: Target, color: 'text-blue-600' },
    { key: 'invite' as const, name: 'Invite', icon: UserPlus, color: 'text-green-600' },
    { key: 'converse' as const, name: 'Converse', icon: MessageCircle, color: 'text-purple-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Acquisition</h1>
        <p className="text-gray-600">
          Manage your identify, invite, and converse activities to build your Dream 100 pipeline.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
              activeSection === section.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <section.icon className={`h-4 w-4 ${activeSection === section.key ? section.color : 'text-gray-400'}`} />
            <span>{section.name}</span>
          </button>
        ))}
      </div>

      {/* Identify Section */}
      {activeSection === 'identify' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Tasks (40% width) */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                {/* Progress bar and counter on same line */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex-1 mr-4">
                    <ProgressBar percentage={getCompletionPercentage(data.identify.tasks)} color="bg-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {data.identify.tasks.filter(t => t.completed).length} out of {data.identify.tasks.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.identify.tasks.map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onToggle={(taskId) => toggleTask('identify', taskId)}
                      color="text-blue-600"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Avatar Snapshots (60% width) */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Avatar Snapshots</CardTitle>
                <p className="text-sm text-gray-600">Click on any avatar to view details</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {data.identify.avatarSnapshots.map((avatar) => (
                    <AvatarSnapshot key={avatar.id} avatar={avatar} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Invite Section */}
      {activeSection === 'invite' && (
        <div className="space-y-8">
          {/* Top Section - Dream 100 Database Views */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Dream 100 Database Views</h2>
              <p className="text-sm text-gray-600">Quick access to your most important contacts</p>
            </div>
            <Dream100DatabaseViews />
          </div>

          {/* Bottom Grid - Tasks and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Tasks (40% width) */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Tasks</CardTitle>
                  {/* Progress bar and counter on same line */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex-1 mr-4">
                      <ProgressBar percentage={getCompletionPercentage(data.invite.tasks)} color="bg-green-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {data.invite.tasks.filter(t => t.completed).length} out of {data.invite.tasks.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.invite.tasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={(taskId) => toggleTask('invite', taskId)}
                        color="text-green-600"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Dream 100 Stats (60% width) */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Dream 100 Stats</CardTitle>
                  <p className="text-sm text-gray-600">Live data from your Dream 100 database</p>
                </CardHeader>
                <CardContent>
                  <Dream100Stats />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Converse Section */}
      {activeSection === 'converse' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-purple-700">BOX 4 - CONVERSE</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {data.converse.tasks.filter(t => t.completed).length}/{data.converse.tasks.length}
                </span>
                <div className="w-24">
                  <ProgressBar percentage={getCompletionPercentage(data.converse.tasks)} color="bg-purple-500" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Conversation and decision tracking tasks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.converse.tasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={(taskId) => toggleTask('converse', taskId)}
                  color="text-purple-600"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Detail Modal (reused from Dream100 page) */}
      <Dialog open={selectedContact !== null} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <SourceIcon source={selectedContact.source} />
                  {selectedContact.name}
                  {selectedContact.is_dream_100 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      💎 Dream 100
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company & Title</label>
                    <p className="text-gray-900">{selectedContact.company}</p>
                    <p className="text-sm text-gray-600">{selectedContact.title}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact Info</label>
                    <p className="text-gray-900">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-gray-600">{selectedContact.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Status</label>
                    <div className="mt-1">
                      <StatusBadge status={selectedContact.latest_decision} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Progress Metrics</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Conversion Probability:</span>
                        <span className="font-medium">{selectedContact.conversion_probability}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Interactions:</span>
                        <span className="font-medium">{selectedContact.interaction_count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Contact:</span>
                        <span className="font-medium">{formatDate(selectedContact.last_interaction)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Quick Status Update</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Research', 'Reached Out', 'In Conversation', '2nd Meeting'].map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={selectedContact.latest_decision === status ? "default" : "outline"}
                          onClick={() => updateContactStatus(selectedContact.id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateContactStatus(selectedContact.id, 'Buy')}
                      >
                        ✅ Buy
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateContactStatus(selectedContact.id, "Don't Buy")}
                      >
                        ❌ No Buy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedContact.notes && (
                <div className="mt-4 pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="mt-1 text-gray-900">{selectedContact.notes}</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}