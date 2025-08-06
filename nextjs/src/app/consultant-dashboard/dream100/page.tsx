'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { dream100Contacts, pipelineStats, importTemplate, type Dream100Contact } from '@/lib/mockData/dream100';
import { 
  Search, 
  Upload, 
  Download, 
  Plus, 
  Filter, 
  ExternalLink, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  Edit,
  Eye,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react';

const statusColors = {
  'Research': 'bg-gray-100 text-gray-800 border-gray-200',
  'Reached Out': 'bg-blue-100 text-blue-800 border-blue-200',
  'In Conversation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  '2nd Meeting': 'bg-orange-100 text-orange-800 border-orange-200',
  'Buy': 'bg-green-100 text-green-800 border-green-200',
  "Don't Buy": 'bg-red-100 text-red-800 border-red-200',
  'Postpone': 'bg-purple-100 text-purple-800 border-purple-200',
  'Referral': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'No Decision': 'bg-gray-100 text-gray-600 border-gray-200'
};

const sourceIcons = {
  'LinkedIn': '💼',
  'Email List': '📧',
  'YouTube': '📺',
  'Referral': '🤝'
};

export default function Dream100DatabasePage() {
  const [contacts, setContacts] = useState<Dream100Contact[]>(dream100Contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [selectedContact, setSelectedContact] = useState<Dream100Contact | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showConversionAlert, setShowConversionAlert] = useState<Dream100Contact | null>(null);

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = !searchTerm || 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || contact.latest_decision === statusFilter;
      const matchesSource = !sourceFilter || contact.source === sourceFilter;
      const matchesRelationship = !relationshipFilter || contact.relationship === relationshipFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesRelationship;
    });
  }, [contacts, searchTerm, statusFilter, sourceFilter, relationshipFilter]);

  // Calculate pipeline statistics
  const stats = useMemo(() => {
    const counts = filteredContacts.reduce((acc, contact) => {
      acc[contact.latest_decision] = (acc[contact.latest_decision] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: filteredContacts.length,
      research: counts['Research'] || 0,
      reachedOut: counts['Reached Out'] || 0,
      inConversation: counts['In Conversation'] || 0,
      secondMeeting: counts['2nd Meeting'] || 0,
      buy: counts['Buy'] || 0,
      dontBuy: counts["Don't Buy"] || 0,
      postpone: counts['Postpone'] || 0,
      referral: counts['Referral'] || 0
    };
  }, [filteredContacts]);

  const handleStatusChange = (contactId: string, newStatus: string) => {
    setContacts(prev => prev.map(contact => {
      if (contact.id === contactId) {
        const updatedContact = {
          ...contact,
          latest_decision: newStatus as any,
          updated_at: new Date().toISOString()
        };

        // Show conversion alert if status changed to "Buy"
        if (newStatus === 'Buy' && contact.latest_decision !== 'Buy') {
          setShowConversionAlert(updatedContact);
        }

        return updatedContact;
      }
      return contact;
    }));
  };

  const handleBulkAction = (action: string) => {
    if (selectedContacts.size === 0) return;

    if (action === 'delete') {
      setContacts(prev => prev.filter(contact => !selectedContacts.has(contact.id)));
      setSelectedContacts(new Set());
    }
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getNextActionDate = (contact: Dream100Contact) => {
    if (contact.latest_decision === 'Buy' || contact.latest_decision === "Don't Buy") {
      return '-';
    }
    return contact.next_contact_date ? formatDate(contact.next_contact_date) : 'Schedule';
  };

  const downloadTemplate = () => {
    const csv = [
      importTemplate.headers.join(','),
      ...importTemplate.sampleData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream100-import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dream 100 Database</h1>
              <p className="text-gray-600">Manage your prospects and track conversions through the pipeline</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={downloadTemplate}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Template
              </Button>
              <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Import CSV
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Import Contacts</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file to import multiple contacts at once
                    </DialogDescription>
                  </DialogHeader>
                  <ImportInterface onClose={() => setShowImportModal(false)} />
                </DialogContent>
              </Dialog>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Pipeline Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Research</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.research}</p>
                  </div>
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Reached Out</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.reachedOut}</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">In Conversation</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.inConversation}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">2nd Meeting</p>
                    <p className="text-2xl font-bold text-orange-900">{stats.secondMeeting}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Buy</p>
                    <p className="text-2xl font-bold text-green-900">{stats.buy}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Don't Buy</p>
                    <p className="text-2xl font-bold text-red-900">{stats.dontBuy}</p>
                  </div>
                  <X className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Postpone</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.postpone}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">Referral</p>
                    <p className="text-2xl font-bold text-indigo-900">{stats.referral}</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contacts, companies, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Research">Research</option>
              <option value="Reached Out">Reached Out</option>
              <option value="In Conversation">In Conversation</option>
              <option value="2nd Meeting">2nd Meeting</option>
              <option value="Buy">Buy</option>
              <option value="Don't Buy">Don't Buy</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Email List">Email List</option>
              <option value="YouTube">YouTube</option>
              <option value="Referral">Referral</option>
            </select>

            <select
              value={relationshipFilter}
              onChange={(e) => setRelationshipFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Relationships</option>
              <option value="Prospect">Prospect</option>
              <option value="Client">Client</option>
              <option value="Vendor">Vendor</option>
              <option value="Promotional Partner">Promotional Partner</option>
            </select>

            {(searchTerm || statusFilter || sourceFilter || relationshipFilter) && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setSourceFilter('');
                  setRelationshipFilter('');
                }}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedContacts.size > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-blue-800">
                  {selectedContacts.size} contact{selectedContacts.size !== 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction('export')}
                  >
                    Export Selected
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contacts Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
                          } else {
                            setSelectedContacts(new Set());
                          }
                        }}
                        checked={selectedContacts.size === filteredContacts.length && filteredContacts.length > 0}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company & Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedContacts.has(contact.id)}
                          onChange={() => toggleContactSelection(contact.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              {contact.email}
                              {contact.is_dream_100 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Target className="h-3 w-3 mr-1" />
                                  Dream 100
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{contact.company}</div>
                        <div className="text-sm text-gray-500">{contact.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.latest_decision}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium border ${statusColors[contact.latest_decision]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          <option value="Research">Research</option>
                          <option value="Reached Out">Reached Out</option>
                          <option value="In Conversation">In Conversation</option>
                          <option value="2nd Meeting">2nd Meeting</option>
                          <option value="Buy">Buy</option>
                          <option value="Don't Buy">Don't Buy</option>
                          <option value="Postpone">Postpone</option>
                          <option value="Referral">Referral</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span>{sourceIcons[contact.source]}</span>
                          <span className="text-sm text-gray-900">{contact.source}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(contact.last_interaction)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className={getNextActionDate(contact) === 'Schedule' ? 'text-orange-600 font-medium' : ''}>
                          {getNextActionDate(contact)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {contact.linkedin_profile && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => window.open(contact.linkedin_profile, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <Target className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
          <div>
            Showing {filteredContacts.length} of {contacts.length} contacts
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded">1</span>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <ContactDetailModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onStatusChange={handleStatusChange}
          />
        )}

        {/* Conversion Alert */}
        {showConversionAlert && (
          <AlertDialog open={true} onOpenChange={() => setShowConversionAlert(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Prospect Converted!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <strong>{showConversionAlert.name}</strong> from <strong>{showConversionAlert.company}</strong> has been marked as "Buy". 
                  This will automatically:
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>Create a client portal for {showConversionAlert.name}</li>
                    <li>Send magic link authentication email</li>
                    <li>Generate service milestones from template</li>
                    <li>Move them to the client management system</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowConversionAlert(null)}>
                  Close
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => setShowConversionAlert(null)}>
                  Create Client Portal
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}

// Import Interface Component
function ImportInterface({ onClose }: { onClose: () => void }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importResults, setImportResults] = useState<{
    total: number;
    successful: number;
    errors: Array<{ row: number; message: string; }>;
  } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setImportStatus('processing');
    
    // Simulate file processing
    setTimeout(() => {
      // Mock validation results
      const mockResults = {
        total: 25,
        successful: 22,
        errors: [
          { row: 5, message: 'Invalid email format: john.doe@' },
          { row: 12, message: 'Missing required field: Company' },
          { row: 18, message: 'Duplicate email: sarah@example.com already exists' }
        ]
      };
      
      setImportResults(mockResults);
      setImportStatus('success');
    }, 2000);
  };

  if (importStatus === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg font-medium">Processing your file...</p>
        <p className="text-sm text-gray-500">Validating contacts and checking for duplicates</p>
      </div>
    );
  }

  if (importStatus === 'success' && importResults) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Import Complete!</h3>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Successfully imported {importResults.successful} out of {importResults.total} contacts
              </p>
            </div>
          </div>
        </div>

        {importResults.errors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  {importResults.errors.length} rows had issues:
                </p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {importResults.errors.map((error, index) => (
                    <li key={index}>Row {error.row}: {error.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            View Imported Contacts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drag and drop your CSV file here
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse for a file
        </p>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer">
            Choose File
          </Button>
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Import Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Required fields: Name, Company, Email</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
          <li>• Duplicate emails will be automatically detected</li>
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// Contact Detail Modal Component
function ContactDetailModal({ 
  contact, 
  onClose, 
  onStatusChange 
}: { 
  contact: Dream100Contact; 
  onClose: () => void;
  onStatusChange: (contactId: string, newStatus: string) => void;
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-medium">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="text-gray-500">{contact.title} at {contact.company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.linkedin_profile && (
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a 
                      href={contact.linkedin_profile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Details</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Source:</span> {sourceIcons[contact.source]} {contact.source}</div>
                <div><span className="font-medium">Relationship:</span> {contact.relationship}</div>
                <div><span className="font-medium">Preferred Contact:</span> {contact.preferred_communication}</div>
                <div><span className="font-medium">Interactions:</span> {contact.interaction_count || 0}</div>
                {contact.conversion_probability && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Conversion Probability:</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">{contact.conversion_probability}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Status</h4>
              <select
                value={contact.latest_decision}
                onChange={(e) => {
                  onStatusChange(contact.id, e.target.value);
                  // Update the local contact object for immediate UI feedback
                }}
                className={`w-full px-3 py-2 rounded-md border text-sm ${statusColors[contact.latest_decision]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Research">Research</option>
                <option value="Reached Out">Reached Out</option>
                <option value="In Conversation">In Conversation</option>
                <option value="2nd Meeting">2nd Meeting</option>
                <option value="Buy">Buy</option>
                <option value="Don't Buy">Don't Buy</option>
                <option value="Postpone">Postpone</option>
                <option value="Referral">Referral</option>
              </select>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Added:</span> {new Date(contact.created_at).toLocaleDateString()}</div>
                <div><span className="font-medium">Last Contact:</span> {contact.last_interaction ? new Date(contact.last_interaction).toLocaleDateString() : 'Never'}</div>
                <div><span className="font-medium">Next Action:</span> {contact.next_contact_date ? new Date(contact.next_contact_date).toLocaleDateString() : 'Not scheduled'}</div>
              </div>
            </div>

            {contact.latest_decision === 'Buy' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-800">Converted to Client</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Client portal has been created and onboarding process initiated.
                </p>
              </div>
            )}
          </div>
        </div>

        {contact.notes && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
              {contact.notes}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Edit Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}