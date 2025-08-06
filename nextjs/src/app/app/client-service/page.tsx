'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, FileCheck } from 'lucide-react';

export default function ClientServicePage() {
  const [activeSection, setActiveSection] = useState<'onboard' | 'deliver' | 'recap'>('onboard');

  const sections = [
    { key: 'onboard' as const, name: 'Onboard', icon: Users, color: 'text-blue-600' },
    { key: 'deliver' as const, name: 'Deliver', icon: Package, color: 'text-green-600' },
    { key: 'recap' as const, name: 'Recap', icon: FileCheck, color: 'text-purple-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Service</h1>
        <p className="text-gray-600">
          Manage your client onboarding, delivery, and recap processes to ensure successful project completion.
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

      {/* Onboard Section */}
      {activeSection === 'onboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Client Onboarding</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Welcome new clients and set up their projects for success</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Onboarding Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain client onboarding workflows, welcome packages, and project setup tools.
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
              <Package className="h-5 w-5 text-green-600" />
              <span>Service Delivery</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Track project progress and deliver services to clients</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delivery Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain project milestone tracking, delivery schedules, and client communication tools.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recap Section */}
      {activeSection === 'recap' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-purple-600" />
              <span>Project Recap</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Review completed projects and gather client feedback</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <FileCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Recap Content Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section will contain project summaries, success metrics, and client testimonial collection.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}