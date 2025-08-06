'use client';

import { useParams } from 'next/navigation';
import { clientPortalMockData, additionalClientPortals } from '@/lib/mockData/clientPortal';
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
  ArrowRight,
  User,
  Building2,
  AlertCircle
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

// Combine all client portals for lookup
const allClientPortals = [clientPortalMockData, ...additionalClientPortals];

export default function ClientPortalPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  // Find the client portal data by ID
  const clientPortalData = allClientPortals.find(
    portal => portal.client_portal.client_id === clientId
  );

  if (!clientPortalData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Portal Not Found</h2>
              <p className="text-gray-600 mb-4">
                The client portal with ID &quot;{clientId}&quot; could not be found.
              </p>
              <p className="text-sm text-gray-500">
                Available demo portals: {allClientPortals.map(p => p.client_portal.client_id).join(', ')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { client_portal } = clientPortalData;

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

        {/* Progress Overview */}
        <Card className="mb-8">
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Milestone Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {client_portal.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {/* Timeline Line */}
                  {index < client_portal.milestones.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        milestone.status === 'completed' 
                          ? 'bg-green-100 border-green-200' 
                          : milestone.status === 'in_progress'
                          ? 'bg-blue-100 border-blue-200'
                          : 'bg-gray-100 border-gray-200'
                      }`}>
                        {getStatusIcon(milestone.status)}
                      </div>
                    </div>
                    
                    {/* Milestone Content */}
                    <div className="flex-1">
                      <Card className={`${milestone.status === 'in_progress' ? 'ring-2 ring-blue-200' : ''}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{milestone.title}</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                            </div>
                            <Badge 
                              variant="secondary"
                              className={getStatusColor(milestone.status)}
                            >
                              {milestone.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {formatDate(milestone.due_date)}
                            </div>
                            {milestone.completed_at && (
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Completed: {formatDate(milestone.completed_at)}
                              </div>
                            )}
                          </div>
                          
                          {/* Progress Bar for In Progress */}
                          {milestone.status === 'in_progress' && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{milestone.progress_percentage}%</span>
                              </div>
                              <Progress value={milestone.progress_percentage} className="h-2" />
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
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Notes */}
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

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client_portal.next_steps.map((step) => (
                  <div key={step.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{step.task}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            Due: {formatDate(step.due_date)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.assigned_to === 'consultant' ? 'Consultant' : 'Client'}
                      </Badge>
                    </div>
                  </div>
                ))}
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
                <span>•</span>
                <span>Client ID: {client_portal.client_id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}