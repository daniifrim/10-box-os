import { ClientAcquisitionData } from '@/lib/types/clientAcquisition';

export const clientAcquisitionData: ClientAcquisitionData = {
  identify: {
    date: new Date().toISOString(),
    completed: false,
    tasks: [
      {
        id: 'identify-1',
        title: 'Do you have any refinement on the alternative?',
        completed: false,
        notes: ''
      },
      {
        id: 'identify-2', 
        title: 'Do you have any refinement on the pain?',
        completed: true,
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        notes: ''
      },
      {
        id: 'identify-3',
        title: 'Did you have a conversation with your avatar today?',
        completed: false,
        notes: ''
      },
      {
        id: 'identify-4',
        title: 'Did you read anything from your avatar today?',
        completed: false, 
        notes: ''
      },
      {
        id: 'identify-5',
        title: 'Do you have any refinement on the problem?',
        completed: false,
        notes: ''
      }
    ],
    avatarSnapshots: [
      {
        id: 'avatar-1',
        name: 'Mining The Profit (14 Hrs)',
        title: 'Mining The Profit (14 Hrs)',
        description: 'I need to increase profit margins. I\'m analyzing heavy loss and heavy mistake meetings.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        targetMarket: 'Heavy machinery industry',
        agency: 'Another agency',
        createdAt: new Date().toISOString()
      },
      {
        id: 'avatar-2',
        name: 'Agency The Annie (27m Hrs)',
        title: 'Agency The Annie (27m Hrs)',
        description: 'I need to increase profit. I\'m analyzing heavy loss and heavy mistake meetings.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=150&h=150&fit=crop&crop=face',
        targetMarket: 'Digital marketing agencies',
        agency: 'Another agency',
        createdAt: new Date().toISOString()
      },
      {
        id: 'avatar-3',
        name: 'Robert The Avatar (Did Tier)',
        title: 'Robert The Avatar (Did Tier)',
        description: 'I need to increase profit. I\'m checking time sales team and having multiple meetings.',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        targetMarket: 'Sales consulting',
        agency: 'Another agency', 
        createdAt: new Date().toISOString()
      }
    ]
  },
  invite: {
    date: new Date().toISOString(),
    completed: false,
    tasks: [
      {
        id: 'invite-1',
        title: 'Research and identify 5 Dream 100 prospects',
        completed: false
      },
      {
        id: 'invite-2',
        title: 'Craft personalized outreach messages',
        completed: false
      },
      {
        id: 'invite-3',
        title: 'Send initial contact messages',
        completed: false
      },
      {
        id: 'invite-4',
        title: 'Follow up on previous outreach',
        completed: false
      },
      {
        id: 'invite-5',
        title: 'Update Dream 100 database with new contacts',
        completed: false
      }
    ]
  },
  converse: {
    date: new Date().toISOString(),
    completed: false,
    tasks: [
      {
        id: 'converse-1',
        title: 'Schedule discovery calls with interested prospects',
        completed: false
      },
      {
        id: 'converse-2',
        title: 'Conduct needs assessment conversations',
        completed: false
      },
      {
        id: 'converse-3',
        title: 'Present solutions to qualified prospects',
        completed: false
      },
      {
        id: 'converse-4',
        title: 'Handle objections and address concerns',
        completed: false
      },
      {
        id: 'converse-5',
        title: 'Close conversations and track decisions',
        completed: false
      }
    ]
  }
};