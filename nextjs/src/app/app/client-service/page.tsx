'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Users, Package, FileCheck, Clock, AlertCircle } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  service: string;
  stage: 'waiting' | 'onboarding' | 'milestone1' | 'milestone2' | 'milestone3' | 'milestone4' | 'milestone5' | 'milestone6' | 'milestone7' | 'completed';
  status: 'on-track' | 'overdue' | 'attention';
  daysSinceStart?: number;
}

const initialClients: Client[] = [
  { id: '1', name: 'Michael Rodriguez', service: '30 Day Service', stage: 'onboarding', status: 'on-track' },
  { id: '2', name: 'Beyonce Knowles', service: '30 Day Service', stage: 'waiting', status: 'overdue', daysSinceStart: 35 },
  { id: '3', name: 'Dolcie Willis', service: 'Retainer Service', stage: 'onboarding', status: 'overdue' },
  { id: '4', name: 'Karol Mercad', service: '5 Day Service', stage: 'onboarding', status: 'attention' },
  { id: '5', name: 'Reo Beach', service: '30 Day Service', stage: 'onboarding', status: 'overdue' },
  { id: '6', name: 'Kirstie Elliott', service: '30 Day Service', stage: 'onboarding', status: 'overdue' },
  { id: '7', name: 'Muhammad Guerra', service: '5 Day Service', stage: 'milestone2', status: 'overdue', daysSinceStart: 1185 },
  { id: '8', name: 'Lara Kumar', service: '5 Day Service', stage: 'milestone4', status: 'overdue', daysSinceStart: 1199 },
  { id: '9', name: 'Lara (Quick)', service: '1 Day Real Quick', stage: 'milestone3', status: 'overdue', daysSinceStart: 1210 },
  { id: '10', name: 'Neve Irving', service: '1 Day Service', stage: 'completed', status: 'overdue' },
  { id: '11', name: 'Geraldine Hartman', service: '1 Day Real Quick', stage: 'completed', status: 'overdue' },
  { id: '12', name: 'John Doe', service: '30 Day Service', stage: 'completed', status: 'overdue' },
  { id: '13', name: 'Johnny Fischer', service: '30 Day Service', stage: 'completed', status: 'attention' },
  { id: '14', name: 'Sarah Connor', service: '5 Day Service', stage: 'milestone1', status: 'on-track' },
  { id: '15', name: 'Tony Stark', service: '30 Day Service', stage: 'milestone5', status: 'attention' },
  { id: '16', name: 'Diana Prince', service: 'Retainer Service', stage: 'milestone6', status: 'on-track' },
  { id: '17', name: 'Bruce Wayne', service: '30 Day Service', stage: 'milestone7', status: 'overdue' }
];

function ClientCard({ client }: { client: Client }) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <AlertCircle className="h-3 w-3" />;
      case 'attention': return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  const handleClick = () => {
    if (client.name === 'Michael Rodriguez') {
      router.push('/app/client-portal-demo');
    } else {
      router.push(`/client-portal/demo-${client.id}`);
    }
  };

  return (
    <div
      className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm text-gray-900">{client.name}</h3>
        {getStatusIcon(client.status) && (
          <div className="text-red-500">
            {getStatusIcon(client.status)}
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{client.service}</p>
      
      <div className="flex items-center justify-between">
        <Badge className={`text-xs ${getStatusColor(client.status)}`}>
          {client.status === 'overdue' ? 'Overdue' : 
           client.status === 'attention' ? 'Attention' : 'On Track'}
        </Badge>
        
        {client.daysSinceStart && (
          <span className="text-xs text-gray-500">
            {client.daysSinceStart} days
          </span>
        )}
      </div>
    </div>
  );
}

export default function ClientServicePage() {
  const [clients] = useState<Client[]>(initialClients);

  const getClientsByStage = (stage: Client['stage']) => {
    return clients.filter(client => client.stage === stage);
  };

  const getStageTitle = (stage: string) => {
    switch (stage) {
      case 'waiting': return 'Waiting';
      case 'onboarding': return 'Onboarding';
      case 'milestone1': return 'Milestone 1';
      case 'milestone2': return 'Milestone 2';
      case 'milestone3': return 'Milestone 3';
      case 'milestone4': return 'Milestone 4';
      case 'milestone5': return 'Milestone 5';
      case 'milestone6': return 'Milestone 6';
      case 'milestone7': return 'Milestone 7';
      case 'completed': return 'Completed';
      default: return stage;
    }
  };

  const getStageCount = (stage: Client['stage']) => {
    return getClientsByStage(stage).length;
  };

  const milestoneStages: Client['stage'][] = ['milestone1', 'milestone2', 'milestone3', 'milestone4', 'milestone5', 'milestone6', 'milestone7'];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Service</h1>
        <p className="text-gray-600">
          Manage your client onboarding, delivery, and recap processes. Click on clients to view their portals.
        </p>
      </div>

      {/* Onboard Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">5. Onboard</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Waiting Column */}
          <div className="bg-gray-50 rounded-lg p-4 min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Waiting</h3>
              <Badge variant="secondary">{getStageCount('waiting')}</Badge>
            </div>
            
            <div className="space-y-3 min-h-[300px]">
              {getClientsByStage('waiting').map(client => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>

          {/* Onboarding Column */}
          <div className="bg-blue-50 rounded-lg p-4 min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Onboarding</h3>
              <Badge variant="secondary">{getStageCount('onboarding')}</Badge>
            </div>
            
            <div className="space-y-3 min-h-[300px]">
              {getClientsByStage('onboarding').map(client => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deliver Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Package className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">6. Deliver</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {milestoneStages.map(stage => (
            <div key={stage} className="bg-green-50 rounded-lg p-4 min-w-[280px] flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{getStageTitle(stage)}</h3>
                <Badge variant="secondary">{getStageCount(stage)}</Badge>
              </div>
              
              <div className="space-y-3 min-h-[300px]">
                {getClientsByStage(stage).map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recap Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <FileCheck className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">7. Recap</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="bg-purple-50 rounded-lg p-4 min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Completed Projects</h3>
              <Badge variant="secondary">{getStageCount('completed')}</Badge>
            </div>
            
            <div className="space-y-3 min-h-[300px]">
              {getClientsByStage('completed').map(client => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}