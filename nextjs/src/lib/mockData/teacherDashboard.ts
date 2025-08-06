export interface DailyTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface BoxTasks {
  completed: number;
  total: number;
  tasks: DailyTask[];
}

export interface DailyTasksData {
  date: string;
  box2: BoxTasks;
  box3: BoxTasks;
  box4: BoxTasks;
  overall_status: 'green' | 'yellow' | 'red';
  days_behind: number;
}

export interface ConsultantMetrics {
  active_clients: number;
  dream100_contacts: number;
  conversion_rate: string;
  monthly_revenue: string;
}

export interface Consultant {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  daily_tasks: DailyTasksData;
  metrics: ConsultantMetrics;
  recent_activity: string[];
}

export interface TeacherDashboardData {
  overview: {
    total_consultants: number;
    active_clients: number;
    avg_conversion_rate: string;
    todays_compliance: number;
    monthly_revenue: string;
  };
  consultants: Consultant[];
  recent_activity: Array<{
    id: string;
    consultant_name: string;
    action: string;
    timestamp: string;
    type: 'conversion' | 'task_completion' | 'warning' | 'milestone';
  }>;
}

// Box task templates
const BOX_2_TASKS: DailyTask[] = [
  { id: 1, title: "Any refinement on the avatar?", completed: false },
  { id: 2, title: "Any refinement on the pain?", completed: false },
  { id: 3, title: "Did you have a conversation with your avatar today?", completed: false },
  { id: 4, title: "Did you read anything from your avatar today?", completed: false },
  { id: 5, title: "Do you have any refinement on the problem?", completed: false }
];

const BOX_3_TASKS: DailyTask[] = [
  { id: 1, title: "Check the 5 you missed yesterday", completed: false },
  { id: 2, title: "Do the 5 for today", completed: false },
  { id: 3, title: "Prepare for the 5 tomorrow", completed: false },
  { id: 4, title: "See future calendar and reorganize", completed: false },
  { id: 5, title: "Are there at least 100 names in your Dream 100?", completed: false }
];

const BOX_4_TASKS: DailyTask[] = [
  { id: 1, title: "Did the prospective client make a decision?", completed: false },
  { id: 2, title: "Did you hear problem, pain, alternative?", completed: false },
  { id: 3, title: "Did you open the call as instructed?", completed: false },
  { id: 4, title: "Did you do today/tomorrow gap analysis?", completed: false },
  { id: 5, title: "Did you recommend a solution?", completed: false }
];

// Mock data with realistic scenarios
export const mockTeacherDashboardData: TeacherDashboardData = {
  overview: {
    total_consultants: 6,
    active_clients: 42,
    avg_conversion_rate: "14.2%",
    todays_compliance: 83,
    monthly_revenue: "$127,500"
  },
  consultants: [
    {
      id: "consultant-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar_url: "/placeholder-avatar-1.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 5,
          total: 5,
          tasks: BOX_2_TASKS.map(task => ({ ...task, completed: true }))
        },
        box3: {
          completed: 5,
          total: 5,
          tasks: BOX_3_TASKS.map(task => ({ ...task, completed: true }))
        },
        box4: {
          completed: 5,
          total: 5,
          tasks: BOX_4_TASKS.map(task => ({ ...task, completed: true }))
        },
        overall_status: "green",
        days_behind: 0
      },
      metrics: {
        active_clients: 8,
        dream100_contacts: 95,
        conversion_rate: "15.8%",
        monthly_revenue: "$24,000"
      },
      recent_activity: [
        "Converted TechCorp CEO to client",
        "Completed all 15 daily tasks",
        "Added 3 new Dream 100 prospects"
      ]
    },
    {
      id: "consultant-2",
      name: "Mike Chen",
      email: "mike@example.com",
      avatar_url: "/placeholder-avatar-2.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 2,
          total: 5,
          tasks: [
            { ...BOX_2_TASKS[0], completed: true },
            { ...BOX_2_TASKS[1], completed: true },
            ...BOX_2_TASKS.slice(2)
          ]
        },
        box3: {
          completed: 1,
          total: 5,
          tasks: [
            { ...BOX_3_TASKS[0], completed: true },
            ...BOX_3_TASKS.slice(1)
          ]
        },
        box4: {
          completed: 3,
          total: 5,
          tasks: [
            { ...BOX_4_TASKS[0], completed: true },
            { ...BOX_4_TASKS[1], completed: true },
            { ...BOX_4_TASKS[2], completed: true },
            ...BOX_4_TASKS.slice(3)
          ]
        },
        overall_status: "red",
        days_behind: 3
      },
      metrics: {
        active_clients: 5,
        dream100_contacts: 87,
        conversion_rate: "8.7%",
        monthly_revenue: "$15,000"
      },
      recent_activity: [
        "Missed Box 3 tasks for 3rd consecutive day",
        "Dream 100 list below 90 contacts",
        "2 client calls scheduled for tomorrow"
      ]
    },
    {
      id: "consultant-3",
      name: "Emily Rodriguez",
      email: "emily@example.com",
      avatar_url: "/placeholder-avatar-3.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 5,
          total: 5,
          tasks: BOX_2_TASKS.map(task => ({ ...task, completed: true }))
        },
        box3: {
          completed: 4,
          total: 5,
          tasks: [
            ...BOX_3_TASKS.slice(0, 4).map(task => ({ ...task, completed: true })),
            BOX_3_TASKS[4]
          ]
        },
        box4: {
          completed: 4,
          total: 5,
          tasks: [
            ...BOX_4_TASKS.slice(0, 4).map(task => ({ ...task, completed: true })),
            BOX_4_TASKS[4]
          ]
        },
        overall_status: "yellow",
        days_behind: 1
      },
      metrics: {
        active_clients: 6,
        dream100_contacts: 98,
        conversion_rate: "12.3%",
        monthly_revenue: "$18,500"
      },
      recent_activity: [
        "Completed 13/15 daily tasks",
        "Prospect meeting scheduled for Thursday",
        "Updated avatar refinement notes"
      ]
    },
    {
      id: "consultant-4",
      name: "David Park",
      email: "david@example.com",
      avatar_url: "/placeholder-avatar-4.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 4,
          total: 5,
          tasks: [
            ...BOX_2_TASKS.slice(0, 4).map(task => ({ ...task, completed: true })),
            BOX_2_TASKS[4]
          ]
        },
        box3: {
          completed: 3,
          total: 5,
          tasks: [
            ...BOX_3_TASKS.slice(0, 3).map(task => ({ ...task, completed: true })),
            ...BOX_3_TASKS.slice(3)
          ]
        },
        box4: {
          completed: 5,
          total: 5,
          tasks: BOX_4_TASKS.map(task => ({ ...task, completed: true }))
        },
        overall_status: "yellow",
        days_behind: 1
      },
      metrics: {
        active_clients: 12,
        dream100_contacts: 92,
        conversion_rate: "18.5%",
        monthly_revenue: "$31,000"
      },
      recent_activity: [
        "Added 5 new Dream 100 prospects",
        "Completed all Box 4 conversation tasks",
        "Client milestone achieved: 30-day recap"
      ]
    },
    {
      id: "consultant-5",
      name: "Lisa Thompson",
      email: "lisa@example.com",
      avatar_url: "/placeholder-avatar-5.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 5,
          total: 5,
          tasks: BOX_2_TASKS.map(task => ({ ...task, completed: true }))
        },
        box3: {
          completed: 5,
          total: 5,
          tasks: BOX_3_TASKS.map(task => ({ ...task, completed: true }))
        },
        box4: {
          completed: 5,
          total: 5,
          tasks: BOX_4_TASKS.map(task => ({ ...task, completed: true }))
        },
        overall_status: "green",
        days_behind: 0
      },
      metrics: {
        active_clients: 11,
        dream100_contacts: 100,
        conversion_rate: "16.2%",
        monthly_revenue: "$28,500"
      },
      recent_activity: [
        "Perfect task completion streak: 7 days",
        "Dream 100 list at capacity",
        "2 new client conversions this week"
      ]
    },
    {
      id: "consultant-6",
      name: "James Wilson",
      email: "james@example.com",
      avatar_url: "/placeholder-avatar-6.jpg",
      daily_tasks: {
        date: "2025-08-06",
        box2: {
          completed: 5,
          total: 5,
          tasks: BOX_2_TASKS.map(task => ({ ...task, completed: true }))
        },
        box3: {
          completed: 5,
          total: 5,
          tasks: BOX_3_TASKS.map(task => ({ ...task, completed: true }))
        },
        box4: {
          completed: 5,
          total: 5,
          tasks: BOX_4_TASKS.map(task => ({ ...task, completed: true }))
        },
        overall_status: "green",
        days_behind: 0
      },
      metrics: {
        active_clients: 10,
        dream100_contacts: 89,
        conversion_rate: "14.7%",
        monthly_revenue: "$26,000"
      },
      recent_activity: [
        "Completed all daily tasks",
        "Onboarded new client: StartupXYZ",
        "Scheduled 3 prospect calls for tomorrow"
      ]
    }
  ],
  recent_activity: [
    {
      id: "activity-1",
      consultant_name: "Sarah Johnson",
      action: "Converted TechCorp CEO to client (Box 4 → 5)",
      timestamp: "2 hours ago",
      type: "conversion"
    },
    {
      id: "activity-2",
      consultant_name: "Mike Chen",
      action: "Missed Box 3 tasks for 3rd consecutive day",
      timestamp: "3 hours ago",
      type: "warning"
    },
    {
      id: "activity-3",
      consultant_name: "Emily Rodriguez",
      action: "Completed 13/15 daily tasks",
      timestamp: "4 hours ago",
      type: "task_completion"
    },
    {
      id: "activity-4",
      consultant_name: "David Park",
      action: "Added 5 new Dream 100 prospects",
      timestamp: "5 hours ago",
      type: "task_completion"
    },
    {
      id: "activity-5",
      consultant_name: "Lisa Thompson",
      action: "Achieved 30-day client milestone",
      timestamp: "6 hours ago",
      type: "milestone"
    },
    {
      id: "activity-6",
      consultant_name: "James Wilson",
      action: "Onboarded new client: StartupXYZ",
      timestamp: "8 hours ago",
      type: "conversion"
    }
  ]
};