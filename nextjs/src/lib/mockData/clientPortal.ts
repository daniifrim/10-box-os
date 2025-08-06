export interface ClientPortalData {
  client_portal: {
    client_id: string;
    client_name: string;
    client_email: string;
    consultant_id: string;
    consultant: {
      name: string;
      company: string;
      email: string;
      phone: string;
      logo_url: string;
      brand_color: string;
    };
    service: {
      type: '1-day' | '5-day' | '30-day' | 'retainer';
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      overall_progress: number;
      status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
    };
    milestones: Array<{
      id: string;
      title: string;
      description: string;
      due_date: string;
      status: 'upcoming' | 'in_progress' | 'completed' | 'overdue';
      completed_at?: string;
      progress_percentage: number;
      documents: Array<{
        name: string;
        url: string;
        uploaded_at: string;
        size: string;
        type: 'pdf' | 'doc' | 'image' | 'other';
      }>;
      activities: Array<{
        id: string;
        description: string;
        timestamp: string;
        type: 'milestone_started' | 'milestone_completed' | 'document_uploaded' | 'note_added';
      }>;
    }>;
    project_notes: Array<{
      id: string;
      content: string;
      created_at: string;
      created_by: 'consultant' | 'client';
      author_name: string;
    }>;
    next_steps: Array<{
      id: string;
      task: string;
      due_date: string;
      assigned_to: 'consultant' | 'client';
    }>;
  };
}

export const clientPortalMockData: ClientPortalData = {
  client_portal: {
    client_id: 'client-acme-corp-001',
    client_name: 'Michael Rodriguez',
    client_email: 'michael@acmecorp.com',
    consultant_id: 'consultant-sarah-001',
    consultant: {
      name: 'Sarah Johnson',
      company: 'SJ Digital Consulting',
      email: 'sarah@sjconsulting.com',
      phone: '+1 (555) 123-4567',
      logo_url: '/consultant-logo.png',
      brand_color: '#3B82F6'
    },
    service: {
      type: '30-day',
      title: 'Digital Marketing Strategy Implementation',
      description: 'Complete digital marketing transformation including SEO optimization, content strategy, social media presence, and lead generation systems.',
      start_date: '2025-07-15',
      end_date: '2025-08-15',
      overall_progress: 0.6,
      status: 'In Progress'
    },
    milestones: [
      {
        id: 'milestone-week-1',
        title: 'Week 1: Discovery & Planning',
        description: 'Initial assessment of current marketing efforts, competitor analysis, and comprehensive strategy development.',
        due_date: '2025-07-22',
        status: 'completed',
        completed_at: '2025-07-21T16:00:00Z',
        progress_percentage: 100,
        documents: [
          {
            name: 'Discovery Report.pdf',
            url: '/docs/discovery-report.pdf',
            uploaded_at: '2025-07-21T16:00:00Z',
            size: '2.1 MB',
            type: 'pdf'
          },
          {
            name: 'Digital Marketing Strategy.pdf',
            url: '/docs/marketing-strategy.pdf',
            uploaded_at: '2025-07-21T16:30:00Z',
            size: '3.4 MB',
            type: 'pdf'
          }
        ],
        activities: [
          {
            id: 'activity-1',
            description: 'Milestone completed ahead of schedule',
            timestamp: '2025-07-21T16:00:00Z',
            type: 'milestone_completed'
          },
          {
            id: 'activity-2',
            description: 'Strategy document uploaded',
            timestamp: '2025-07-21T16:30:00Z',
            type: 'document_uploaded'
          }
        ]
      },
      {
        id: 'milestone-week-2',
        title: 'Week 2: Development Phase 1',
        description: 'Implementation of foundational marketing assets including website optimization, initial content creation, and campaign setup.',
        due_date: '2025-07-29',
        status: 'completed',
        completed_at: '2025-07-28T18:00:00Z',
        progress_percentage: 100,
        documents: [
          {
            name: 'Website Optimization Report.pdf',
            url: '/docs/website-optimization.pdf',
            uploaded_at: '2025-07-26T14:00:00Z',
            size: '1.8 MB',
            type: 'pdf'
          },
          {
            name: 'Content Calendar Q3.pdf',
            url: '/docs/content-calendar.pdf',
            uploaded_at: '2025-07-28T18:00:00Z',
            size: '1.2 MB',
            type: 'pdf'
          },
          {
            name: 'Campaign Setup Screenshots.zip',
            url: '/docs/campaign-screenshots.zip',
            uploaded_at: '2025-07-28T18:15:00Z',
            size: '4.7 MB',
            type: 'other'
          }
        ],
        activities: [
          {
            id: 'activity-3',
            description: 'Website optimization completed',
            timestamp: '2025-07-26T14:00:00Z',
            type: 'document_uploaded'
          },
          {
            id: 'activity-4',
            description: 'Phase 1 development completed',
            timestamp: '2025-07-28T18:00:00Z',
            type: 'milestone_completed'
          }
        ]
      },
      {
        id: 'milestone-week-3',
        title: 'Week 3: Development Phase 2',
        description: 'Advanced implementation including lead generation systems, email automation, social media campaigns, and performance tracking setup.',
        due_date: '2025-08-05',
        status: 'in_progress',
        progress_percentage: 65,
        documents: [
          {
            name: 'Lead Generation Setup.pdf',
            url: '/docs/lead-gen-setup.pdf',
            uploaded_at: '2025-08-02T10:00:00Z',
            size: '2.3 MB',
            type: 'pdf'
          }
        ],
        activities: [
          {
            id: 'activity-5',
            description: 'Lead generation system deployed',
            timestamp: '2025-08-02T10:00:00Z',
            type: 'document_uploaded'
          },
          {
            id: 'activity-6',
            description: 'Email automation sequences configured',
            timestamp: '2025-08-03T15:30:00Z',
            type: 'note_added'
          }
        ]
      },
      {
        id: 'milestone-week-4',
        title: 'Week 4: Testing & Refinement',
        description: 'Comprehensive testing of all systems, performance optimization, and refinement based on initial results and feedback.',
        due_date: '2025-08-12',
        status: 'upcoming',
        progress_percentage: 0,
        documents: [],
        activities: []
      },
      {
        id: 'milestone-final',
        title: 'Final Review & Handoff',
        description: 'Final performance review, documentation handoff, training session, and transition to ongoing support if applicable.',
        due_date: '2025-08-15',
        status: 'upcoming',
        progress_percentage: 0,
        documents: [],
        activities: []
      }
    ],
    project_notes: [
      {
        id: 'note-1',
        content: 'Great progress on the website optimization! The page load speed improvements are already showing positive results in user engagement.',
        created_at: '2025-07-26T16:00:00Z',
        created_by: 'consultant',
        author_name: 'Sarah Johnson'
      },
      {
        id: 'note-2',
        content: 'The new content calendar looks fantastic. We\'re particularly excited about the video content strategy for Q4.',
        created_at: '2025-07-29T09:30:00Z',
        created_by: 'client',
        author_name: 'Michael Rodriguez'
      },
      {
        id: 'note-3',
        content: 'Lead generation system is performing above expectations - we\'re seeing 40% more qualified leads compared to the baseline.',
        created_at: '2025-08-03T11:15:00Z',
        created_by: 'consultant',
        author_name: 'Sarah Johnson'
      }
    ],
    next_steps: [
      {
        id: 'step-1',
        task: 'Complete social media campaign setup',
        due_date: '2025-08-04',
        assigned_to: 'consultant'
      },
      {
        id: 'step-2',
        task: 'Review and approve email automation sequences',
        due_date: '2025-08-05',
        assigned_to: 'client'
      },
      {
        id: 'step-3',
        task: 'Prepare performance metrics dashboard',
        due_date: '2025-08-06',
        assigned_to: 'consultant'
      }
    ]
  }
};

// Additional client portals for different service types
export const additionalClientPortals: ClientPortalData[] = [
  {
    client_portal: {
      client_id: 'client-techstart-002',
      client_name: 'Jennifer Chen',
      client_email: 'jennifer@techstart.io',
      consultant_id: 'consultant-sarah-001',
      consultant: {
        name: 'Sarah Johnson',
        company: 'SJ Digital Consulting',
        email: 'sarah@sjconsulting.com',
        phone: '+1 (555) 123-4567',
        logo_url: '/consultant-logo.png',
        brand_color: '#3B82F6'
      },
      service: {
        type: '5-day',
        title: 'Brand Identity & Website Launch',
        description: 'Complete brand identity development with professional website design and launch.',
        start_date: '2025-08-01',
        end_date: '2025-08-06',
        overall_progress: 0.8,
        status: 'In Progress'
      },
      milestones: [
        {
          id: 'milestone-5day-1',
          title: 'Discovery & Assessment',
          description: 'Brand discovery session and competitive analysis.',
          due_date: '2025-08-01',
          status: 'completed',
          completed_at: '2025-08-01T17:00:00Z',
          progress_percentage: 100,
          documents: [
            {
              name: 'Brand Discovery Report.pdf',
              url: '/docs/brand-discovery.pdf',
              uploaded_at: '2025-08-01T17:00:00Z',
              size: '1.9 MB',
              type: 'pdf'
            }
          ],
          activities: []
        }
      ],
      project_notes: [],
      next_steps: []
    }
  }
];