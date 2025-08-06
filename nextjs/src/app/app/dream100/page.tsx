"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  FileText,
  Filter,
  Edit3,
  Mail,
  Linkedin,
  Youtube,
  Users,
  MessageSquare,
  Eye,
  ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { dream100Contacts, Dream100Contact, pipelineStats, importTemplate } from "@/lib/mockData/dream100";

export default function Dream100Database() {
  const [contacts, setContacts] = useState<Dream100Contact[]>(dream100Contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Dream100Contact | null>(null);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  
  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.latest_decision === statusFilter;
      const matchesSource = sourceFilter === 'all' || contact.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [contacts, searchTerm, statusFilter, sourceFilter]);

  // Status badge component
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

  // Source icon component
  const SourceIcon = ({ source }: { source: string }) => {
    const icons = {
      'LinkedIn': <Linkedin className="h-4 w-4 text-blue-600" />,
      'Email List': <Mail className="h-4 w-4 text-gray-600" />,
      'YouTube': <Youtube className="h-4 w-4 text-red-600" />,
      'Referral': <Users className="h-4 w-4 text-green-600" />
    };
    
    return icons[source as keyof typeof icons] || <MessageSquare className="h-4 w-4 text-gray-400" />;
  };

  // Update contact status
  const updateContactStatus = (contactId: string, newStatus: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            latest_decision: newStatus as Dream100Contact['latest_decision'],
            updated_at: new Date().toISOString()
          }
        : contact
    ));
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get days until next contact
  const getDaysUntilContact = (dateString?: string) => {
    if (!dateString) return null;
    const today = new Date();
    const contactDate = new Date(dateString);
    const diffTime = contactDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Download CSV template
  const downloadTemplate = () => {
    const csvContent = [
      importTemplate.headers.join(','),
      ...importTemplate.sampleData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream100_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dream 100 Database</h1>
          <p className="text-gray-600 mt-1">Manage your top prospects and track conversion pipeline</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Contacts
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Import Contacts</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop your CSV file here or click to browse</p>
                <Button variant="outline" className="mt-2">Choose File</Button>
              </div>
              <div className="text-center">
                <Button variant="ghost" onClick={downloadTemplate} className="flex items-center gap-2 mx-auto">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Full Name*" />
              <Input placeholder="Company*" />
              <Input placeholder="Email*" type="email" />
              <Input placeholder="Phone" />
              <Input placeholder="Job Title" />
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Source</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email List">Email List</option>
                <option value="YouTube">YouTube</option>
                <option value="Referral">Referral</option>
              </select>
              <Input placeholder="LinkedIn Profile URL" className="col-span-2" />
              <textarea 
                placeholder="Notes" 
                className="col-span-2 flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="col-span-2 flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>Cancel</Button>
                <Button>Add Contact</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>

        <Button variant="outline" onClick={downloadTemplate} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Template
        </Button>
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Pipeline Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Object.entries(pipelineStats).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold text-primary-600">{count}</div>
              <div className="text-sm text-gray-600 capitalize">
                {status.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts, companies, emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Research">Research</option>
            <option value="Reached Out">Reached Out</option>
            <option value="In Conversation">In Conversation</option>
            <option value="2nd Meeting">2nd Meeting</option>
            <option value="Buy">Buy</option>
            <option value="Don't Buy">Don&apos;t Buy</option>
            <option value="Postpone">Postpone</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <select 
            value={sourceFilter} 
            onChange={(e) => setSourceFilter(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Sources</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Email List">Email List</option>
            <option value="YouTube">YouTube</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                <th className="text-left p-4 font-medium text-gray-900">Company</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Last Contact</th>
                <th className="text-left p-4 font-medium text-gray-900">Next Action</th>
                <th className="text-left p-4 font-medium text-gray-900">Probability</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => {
                const daysUntil = getDaysUntilContact(contact.next_contact_date);
                const isOverdue = daysUntil !== null && daysUntil < 0;
                const isDueToday = daysUntil === 0;
                
                return (
                  <tr key={contact.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <SourceIcon source={contact.source} />
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.title}</div>
                          <div className="text-xs text-gray-400">{contact.email}</div>
                        </div>
                        {contact.is_dream_100 && (
                          <div className="ml-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              💎 Top 100
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{contact.company}</div>
                    </td>
                    
                    <td className="p-4">
                      <StatusBadge status={contact.latest_decision} />
                    </td>
                    
                    <td className="p-4">
                      <div className="text-sm text-gray-900">
                        {formatDate(contact.last_interaction)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {contact.interaction_count} interactions
                      </div>
                    </td>
                    
                    <td className="p-4">
                      {contact.next_contact_date ? (
                        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : isDueToday ? 'text-yellow-600 font-medium' : 'text-gray-900'}`}>
                          {formatDate(contact.next_contact_date)}
                          {isOverdue && <span className="ml-1">⚠️</span>}
                          {isDueToday && <span className="ml-1">🔔</span>}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full" 
                            style={{width: `${contact.conversion_probability || 0}%`}}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{contact.conversion_probability || 0}%</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedContact(contact)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        {contact.linkedin_profile && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(contact.linkedin_profile, '_blank')}
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </Card>

      {/* Contact Detail Modal */}
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