export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  completed_at?: string;
  notes?: string;
}

export interface DailyTasksData {
  consultant_id: string;
  date: string;
  box2_tasks: DailyTask[];
  box3_tasks: DailyTask[];
  box4_tasks: DailyTask[];
  overall_completion: number;
  submitted: boolean;
  submitted_at?: string;
}

export interface PerformanceHistory {
  current_streak: number;
  this_week_completion: number;
  this_month_completion: number;
  compliance_status: 'green' | 'yellow' | 'red';
  weekly_data: {
    date: string;
    completion: number;
    tasks_completed: number;
    total_tasks: number;
    status: 'green' | 'yellow' | 'red';
  }[];
}

// Box 2 (Identify) - 5 Daily Tasks
const box2TaskTemplates = [
  "Any refinement on the avatar?",
  "Any refinement on the pain?",
  "Did you have a conversation with your avatar today?",
  "Did you read anything from your avatar today?",
  "Do you have any refinement on the problem?"
];

// Box 3 (Invite) - 5 Daily Tasks
const box3TaskTemplates = [
  "Check the 5 you missed yesterday",
  "Do the 5 for today",
  "Prepare for the 5 tomorrow", 
  "See future calendar and reorganize",
  "Are there at least 100 names in your Dream 100?"
];

// Box 4 (Converse) - 5 Daily Tasks
const box4TaskTemplates = [
  "Did the prospective client make a decision?",
  "Did you hear problem, pain, alternative?",
  "Did you open the call as instructed?",
  "Did you do today/tomorrow gap analysis?",
  "Did you recommend a solution?"
];

// Helper function to create tasks for a specific date
const createTasksForDate = (date: string, completionRate: number = 0.8) => {
  const createTasks = (templates: string[], boxPrefix: string): DailyTask[] => {
    return templates.map((title, index) => {
      const completed = Math.random() < completionRate;
      return {
        id: `${boxPrefix}_${index + 1}`,
        title,
        completed,
        completed_at: completed ? `${date}T${9 + Math.floor(Math.random() * 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00Z` : undefined,
        notes: completed && Math.random() < 0.3 ? getSampleNote(boxPrefix, index) : undefined
      };
    });
  };

  return {
    box2_tasks: createTasks(box2TaskTemplates, 'box2'),
    box3_tasks: createTasks(box3TaskTemplates, 'box3'),
    box4_tasks: createTasks(box4TaskTemplates, 'box4')
  };
};

const getSampleNote = (boxPrefix: string, index: number): string => {
  const notes = {
    box2: [
      "Refined target company size to 50-200 employees",
      "Identified new pain point around compliance costs",
      "Had coffee with industry contact, learned about new regulations",
      "Read industry report on automation trends",
      "Discovered budget timing issues in Q4"
    ],
    box3: [
      "Followed up with 3 prospects from last week",
      "Sent 5 LinkedIn connection requests to VPs",
      "Scheduled calls for tomorrow morning",
      "Reorganized calendar, moved 2 calls to next week",
      "Added 8 new prospects from referrals"
    ],
    box4: [
      "Client decided to move forward with pilot program",
      "Clearly heard budget concerns and timeline pressure",
      "Used proper opening framework, built rapport first",
      "Gap analysis revealed 40% efficiency opportunity",
      "Recommended phased implementation approach"
    ]
  };
  
  return notes[boxPrefix as keyof typeof notes]?.[index] || "Task completed successfully";
};

// Today's data (partial completion)
export const todaysTasks: DailyTasksData = {
  consultant_id: "consultant-1",
  date: "2025-08-06",
  box2_tasks: [
    {
      id: "box2_1",
      title: "Any refinement on the avatar?",
      completed: true,
      completed_at: "2025-08-06T09:15:00Z",
      notes: "Refined target company size to 50-200 employees"
    },
    {
      id: "box2_2", 
      title: "Any refinement on the pain?",
      completed: true,
      completed_at: "2025-08-06T09:45:00Z",
      notes: "Identified new pain point around compliance costs"
    },
    {
      id: "box2_3",
      title: "Did you have a conversation with your avatar today?",
      completed: true,
      completed_at: "2025-08-06T10:30:00Z"
    },
    {
      id: "box2_4",
      title: "Did you read anything from your avatar today?",
      completed: true,
      completed_at: "2025-08-06T11:15:00Z"
    },
    {
      id: "box2_5",
      title: "Do you have any refinement on the problem?",
      completed: false
    }
  ],
  box3_tasks: [
    {
      id: "box3_1",
      title: "Check the 5 you missed yesterday",
      completed: true,
      completed_at: "2025-08-06T08:30:00Z",
      notes: "Followed up with 3 prospects from last week"
    },
    {
      id: "box3_2",
      title: "Do the 5 for today", 
      completed: true,
      completed_at: "2025-08-06T14:20:00Z"
    },
    {
      id: "box3_3",
      title: "Prepare for the 5 tomorrow",
      completed: true,
      completed_at: "2025-08-06T15:45:00Z"
    },
    {
      id: "box3_4",
      title: "See future calendar and reorganize",
      completed: false
    },
    {
      id: "box3_5",
      title: "Are there at least 100 names in your Dream 100?",
      completed: true,
      completed_at: "2025-08-06T16:10:00Z"
    }
  ],
  box4_tasks: [
    {
      id: "box4_1",
      title: "Did the prospective client make a decision?",
      completed: true,
      completed_at: "2025-08-06T13:30:00Z",
      notes: "Client decided to move forward with pilot program"
    },
    {
      id: "box4_2",
      title: "Did you hear problem, pain, alternative?",
      completed: true,
      completed_at: "2025-08-06T13:35:00Z"
    },
    {
      id: "box4_3",
      title: "Did you open the call as instructed?",
      completed: false
    },
    {
      id: "box4_4",
      title: "Did you do today/tomorrow gap analysis?",
      completed: true,
      completed_at: "2025-08-06T14:00:00Z"
    },
    {
      id: "box4_5",
      title: "Did you recommend a solution?",
      completed: true,
      completed_at: "2025-08-06T14:15:00Z"
    }
  ],
  overall_completion: 0.8, // 12/15 tasks
  submitted: false
};

// Historical performance data
export const performanceHistory: PerformanceHistory = {
  current_streak: 7,
  this_week_completion: 0.85,
  this_month_completion: 0.78,
  compliance_status: 'green',
  weekly_data: [
    {
      date: "2025-07-31",
      completion: 1.0,
      tasks_completed: 15,
      total_tasks: 15,
      status: 'green'
    },
    {
      date: "2025-08-01", 
      completion: 1.0,
      tasks_completed: 15,
      total_tasks: 15,
      status: 'green'
    },
    {
      date: "2025-08-02",
      completion: 0.67,
      tasks_completed: 10,
      total_tasks: 15, 
      status: 'yellow'
    },
    {
      date: "2025-08-03",
      completion: 1.0,
      tasks_completed: 15,
      total_tasks: 15,
      status: 'green'
    },
    {
      date: "2025-08-04",
      completion: 1.0,
      tasks_completed: 15,
      total_tasks: 15,
      status: 'green'
    },
    {
      date: "2025-08-05",
      completion: 0.0,
      tasks_completed: 0,
      total_tasks: 15,
      status: 'red'
    },
    {
      date: "2025-08-06",
      completion: 0.8,
      tasks_completed: 12,
      total_tasks: 15,
      status: 'green'
    }
  ]
};

// Historical data for the past month
export const generateHistoricalTasks = (days: number = 30): DailyTasksData[] => {
  const tasks: DailyTasksData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Vary completion rate based on day of week
    const dayOfWeek = date.getDay();
    let completionRate = 0.8; // Default
    
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
      completionRate = Math.random() < 0.3 ? 0 : 0.6; // Sometimes skip weekends
    } else if (dayOfWeek === 1) { // Monday
      completionRate = 0.9; // Strong Monday
    } else if (dayOfWeek === 5) { // Friday
      completionRate = 0.75; // Slightly lower Friday
    }
    
    const dayTasks = createTasksForDate(dateString, completionRate);
    const totalCompleted = [...dayTasks.box2_tasks, ...dayTasks.box3_tasks, ...dayTasks.box4_tasks]
      .filter(task => task.completed).length;
    
    tasks.push({
      consultant_id: "consultant-1",
      date: dateString,
      ...dayTasks,
      overall_completion: totalCompleted / 15,
      submitted: totalCompleted > 0,
      submitted_at: totalCompleted > 0 ? `${dateString}T17:30:00Z` : undefined
    });
  }
  
  return tasks;
};

// Export all data
export const dailyTasksData = {
  current: todaysTasks,
  performance: performanceHistory,
  history: generateHistoricalTasks(30)
};