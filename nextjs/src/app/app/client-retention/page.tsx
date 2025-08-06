'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Repeat, RefreshCw } from 'lucide-react';

export default function ClientRetentionPage() {
  const [activeSection, setActiveSection] = useState<'consult' | 'deliver' | 'repeat'>('consult');

  const sections = [
    { key: 'consult' as const, name: 'Consult', icon: Users, color: 'text-blue-600' },
    { key: 'deliver' as const, name: 'Deliver', icon: Repeat, color: 'text-green-600' },
    { key: 'repeat' as const, name: 'Repeat', icon: RefreshCw, color: 'text-purple-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Retention</h1>
        <p className="text-gray-600">
          Build long-term relationships with clients through ongoing consultation, delivery, and repeat business strategies.
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

      {/* Consult Section */}
      {activeSection === 'consult' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Client Consultation</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Provide ongoing strategic guidance and maintain client relationships</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Consultation Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain client check-in schedules, consultation workflows, and relationship management tools.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deliver Section */}
      {activeSection === 'deliver' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Repeat className="h-5 w-5 text-green-600" />
              <span>Ongoing Delivery</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Manage continuous service delivery and additional project requests</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <Repeat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delivery Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain retainer project management, additional service requests, and delivery optimization.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Repeat Section */}
      {activeSection === 'repeat' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-purple-600" />
              <span>Repeat Business</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Generate repeat business and expand client relationships</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <RefreshCw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Repeat Business Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain upselling strategies, renewal workflows, and client expansion opportunities.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}