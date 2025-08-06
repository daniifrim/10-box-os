'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { mockTeacherDashboardData, type Consultant } from '@/lib/mockData/teacherDashboard';

// Status color mappings
const statusColors = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500', 
  red: 'bg-red-500'
};

const statusBgColors = {
  green: 'bg-green-50 border-green-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  red: 'bg-red-50 border-red-200'
};

const statusTextColors = {
  green: 'text-green-700',
  yellow: 'text-yellow-700',
  red: 'text-red-700'
};

// Activity type icons
const activityIcons = {
  conversion: '🎉',
  task_completion: '✅', 
  warning: '⚠️',
  milestone: '🏆'
};

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, className = '' }) => (
  <Card className={`${className}`}>
    <CardHeader className="pb-2">
      <CardDescription className="text-sm font-medium">{title}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
);

interface TaskProgressProps {
  label: string;
  completed: number;
  total: number;
  size?: 'sm' | 'md';
}

const TaskProgress: React.FC<TaskProgressProps> = ({ label, completed, total, size = 'md' }) => {
  const percentage = (completed / total) * 100;
  const isComplete = completed === total;
  
  return (
    <div className={`flex items-center gap-2 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <span className="font-medium min-w-0">{label}:</span>
      <div className="flex items-center gap-1">
        <div className={`relative ${size === 'sm' ? 'w-12 h-2' : 'w-16 h-2'} bg-gray-200 rounded-full overflow-hidden`}>
          <div 
            className={`absolute left-0 top-0 h-full transition-all duration-300 ${
              isComplete ? 'bg-green-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium min-w-0`}>
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};

interface ConsultantCardProps {
  consultant: Consultant;
}

interface TaskDetailModalProps {
  consultant: Consultant;
  children: React.ReactNode;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ consultant, children }) => {
  const { name, daily_tasks } = consultant;
  const { box2, box3, box4 } = daily_tasks;

  const boxData = [
    { label: 'Box 2 (Identify)', data: box2 },
    { label: 'Box 3 (Invite)', data: box3 },
    { label: 'Box 4 (Converse)', data: box4 }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            {name} - Daily Task Details
          </DialogTitle>
          <DialogDescription>
            Task completion status for {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {boxData.map(({ label, data }) => (
            <div key={label} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base">{label}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  data.completed === data.total ? 'bg-green-100 text-green-800' : 
                  data.completed >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {data.completed}/{data.total} Complete
                </span>
              </div>
              
              <div className="space-y-2">
                {data.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {task.completed && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${task.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant }) => {
  const { name, daily_tasks, metrics } = consultant;
  const { box2, box3, box4, overall_status, days_behind } = daily_tasks;
  
  const totalCompleted = box2.completed + box3.completed + box4.completed;
  const totalTasks = box2.total + box3.total + box4.total;
  
  return (
    <TaskDetailModal consultant={consultant}>
      <Card className={`relative ${statusBgColors[overall_status]} hover:shadow-md transition-shadow cursor-pointer`}>
      {/* Status indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${statusColors[overall_status]}`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base leading-tight">{name}</CardTitle>
            <CardDescription className="text-xs">
              {totalCompleted}/{totalTasks} tasks completed
              {days_behind > 0 && (
                <span className={`ml-2 ${statusTextColors[overall_status]}`}>
                  ({days_behind} day{days_behind > 1 ? 's' : ''} behind)
                </span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Box task progress */}
        <div className="space-y-2">
          <TaskProgress label="Box 2" completed={box2.completed} total={box2.total} size="sm" />
          <TaskProgress label="Box 3" completed={box3.completed} total={box3.total} size="sm" />
          <TaskProgress label="Box 4" completed={box4.completed} total={box4.total} size="sm" />
        </div>
        
        {/* Metrics */}
        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Clients:</span>
              <span className="font-semibold ml-1">{metrics.active_clients}</span>
            </div>
            <div>
              <span className="text-muted-foreground">D100:</span>
              <span className="font-semibold ml-1">{metrics.dream100_contacts}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Conv Rate:</span>
              <span className="font-semibold ml-1">{metrics.conversion_rate}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-semibold ml-1">{metrics.monthly_revenue}</span>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </TaskDetailModal>
  );
};

export default function TeacherDashboard() {
  const { overview, consultants, recent_activity } = mockTeacherDashboardData;
  
  // Calculate compliance color
  const complianceStatus = overview.todays_compliance >= 90 ? 'green' : 
                          overview.todays_compliance >= 70 ? 'yellow' : 'red';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">10</span>
              </div>
              <h1 className="text-xl font-semibold">10-box OS - Teacher Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium">Teacher</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Consultants" 
            value={overview.total_consultants.toString()} 
          />
          <MetricCard 
            title="Active Clients" 
            value={overview.active_clients.toString()} 
          />
          <MetricCard 
            title="Avg Conv Rate" 
            value={overview.avg_conversion_rate} 
          />
          <MetricCard 
            title="Today's Compliance" 
            value={`${overview.todays_compliance}%`}
            className={statusBgColors[complianceStatus]}
          />
        </div>

        {/* Consultant Performance Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Consultant Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <ConsultantCard key={consultant.id} consultant={consultant} />
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest consultant actions and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recent_activity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-sm">
                    {activityIcons[activity.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.consultant_name}</span>{' '}
                      <span>{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}