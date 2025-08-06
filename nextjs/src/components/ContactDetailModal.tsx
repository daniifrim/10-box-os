"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dream100Contact } from "@/lib/mockData/dream100";
import { 
  Mail, 
  Phone, 
  ExternalLink, 
  TrendingUp,
  CheckCircle2 
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

interface ContactDetailModalProps {
  contact: Dream100Contact | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (contactId: string, newStatus: string) => void;
}

export function ContactDetailModal({ 
  contact, 
  isOpen, 
  onOpenChange, 
  onStatusUpdate 
}: ContactDetailModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                onChange={(e) => onStatusUpdate(contact.id, e.target.value)}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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