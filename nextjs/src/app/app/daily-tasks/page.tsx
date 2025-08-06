'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dailyTasksData, DailyTask, DailyTasksData } from '@/lib/mockData/dailyTasks';

export default function DailyTasksPage() {
  const [tasks, setTasks] = useState<DailyTasksData>(dailyTasksData.current);
  const [showHistory, setShowHistory] = useState(false);
  const performance = dailyTasksData.performance;

  // Calculate current completion stats
  const totalTasks = tasks.box2_tasks.length + tasks.box3_tasks.length + tasks.box4_tasks.length;
  const completedTasks = [...tasks.box2_tasks, ...tasks.box3_tasks, ...tasks.box4_tasks]
    .filter(task => task.completed).length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Calculate box-specific completion
  const getBoxCompletion = (boxTasks: DailyTask[]) => {
    const completed = boxTasks.filter(task => task.completed).length;
    return Math.round((completed / boxTasks.length) * 100);
  };

  const box2Completion = getBoxCompletion(tasks.box2_tasks);
  const box3Completion = getBoxCompletion(tasks.box3_tasks);
  const box4Completion = getBoxCompletion(tasks.box4_tasks);

  // Toggle task completion
  const toggleTask = (boxType: 'box2_tasks' | 'box3_tasks' | 'box4_tasks', taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [boxType]: prev[boxType].map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completed_at: !task.completed ? new Date().toISOString() : undefined
            }
          : task
      )
    }));
  };

  // Save progress
  const saveProgress = () => {
    // In real app, this would save to backend
    console.log('Saving progress...', tasks);
    alert('Progress saved successfully!');
  };

  // Submit day
  const submitDay = () => {
    if (completedTasks === totalTasks) {
      setTasks(prev => ({
        ...prev,
        submitted: true,
        submitted_at: new Date().toISOString()
      }));
      alert('Day submitted successfully! Great work completing all tasks!');
    } else {
      const remaining = totalTasks - completedTasks;
      alert(`Please complete the remaining ${remaining} task${remaining > 1 ? 's' : ''} before submitting.`);
    }
  };

  // Progress bar component
  const ProgressBar = ({ percentage, color = 'bg-blue-500' }: { percentage: number; color?: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  // Task item component
  const TaskItem = ({ 
    task, 
    boxType, 
    color 
  }: { 
    task: DailyTask; 
    boxType: 'box2_tasks' | 'box3_tasks' | 'box4_tasks';
    color: string;
  }) => (
    <div 
      className={`flex items-start space-x-3 p-3 rounded-lg border transition-all hover:bg-gray-50 ${
        task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(boxType, task.id)}
        className={`mt-1 h-4 w-4 rounded border-gray-300 ${color} focus:ring-2 focus:ring-offset-2`}
      />
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </p>
        {task.completed && task.completed_at && (
          <p className="text-xs text-gray-400 mt-1">
            Completed at {new Date(task.completed_at).toLocaleTimeString()}
          </p>
        )}
        {task.notes && (
          <p className="text-xs text-gray-600 mt-1 italic">
            Note: {task.notes}
          </p>
        )}
      </div>
    </div>
  );

  // Status badge
  const getStatusBadge = (status: 'green' | 'yellow' | 'red') => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels = {
      green: 'Compliant',
      yellow: 'At Risk',
      red: 'Non-Compliant'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[status]}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
        {labels[status]}
      </span>
    );
  };

  // Weekly calendar view
  const WeeklyCalendar = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>This Week's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {performance.weekly_data.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();
            
            const statusColors = {
              green: 'bg-green-100 border-green-500 text-green-800',
              yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800',
              red: 'bg-red-100 border-red-500 text-red-800'
            };

            return (
              <div key={index} className={`p-3 rounded-lg border-2 text-center ${statusColors[day.status]}`}>
                <div className="font-medium text-xs">{dayName}</div>
                <div className="font-bold text-lg">{dayNumber}</div>
                <div className="text-xs">{day.tasks_completed}/{day.total_tasks}</div>
                <div className="text-xs font-medium">{Math.round(day.completion * 100)}%</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Task Tracker</h1>
        <p className="text-gray-600">
          {new Date(tasks.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">🔥 {performance.current_streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(performance.this_week_completion * 100)}%</div>
            <div className="text-sm text-gray-600">Week Complete</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{Math.round(performance.this_month_completion * 100)}%</div>
            <div className="text-sm text-gray-600">Month Complete</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mb-2">{getStatusBadge(performance.compliance_status)}</div>
            <div className="text-xs text-gray-600">Compliance Status</div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Today's Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{completedTasks}/{totalTasks} ({completionPercentage}%)</span>
          </div>
          <ProgressBar percentage={completionPercentage} color="bg-blue-500" />
        </CardContent>
      </Card>

      {/* Box 2 - Identify */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-blue-700">BOX 2 - IDENTIFY</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{tasks.box2_tasks.filter(t => t.completed).length}/{tasks.box2_tasks.length}</span>
              <div className="w-24">
                <ProgressBar percentage={box2Completion} color="bg-blue-500" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Avatar and problem refinement tasks</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.box2_tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                boxType="box2_tasks" 
                color="text-blue-600" 
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Box 3 - Invite */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-green-700">BOX 3 - INVITE</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{tasks.box3_tasks.filter(t => t.completed).length}/{tasks.box3_tasks.length}</span>
              <div className="w-24">
                <ProgressBar percentage={box3Completion} color="bg-green-500" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Dream 100 outreach and preparation tasks</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.box3_tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                boxType="box3_tasks" 
                color="text-green-600" 
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Box 4 - Converse */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-purple-700">BOX 4 - CONVERSE</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{tasks.box4_tasks.filter(t => t.completed).length}/{tasks.box4_tasks.length}</span>
              <div className="w-24">
                <ProgressBar percentage={box4Completion} color="bg-purple-500" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Conversation and decision tracking tasks</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.box4_tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                boxType="box4_tasks" 
                color="text-purple-600" 
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={() => setShowHistory(!showHistory)}
          variant="outline"
          className="flex-1"
        >
          📋 {showHistory ? 'Hide' : 'View'} History
        </Button>
        <Button 
          onClick={saveProgress}
          variant="outline"
          className="flex-1"
        >
          💾 Save Progress
        </Button>
        <Button 
          onClick={submitDay}
          className={`flex-1 ${
            completedTasks === totalTasks 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={tasks.submitted}
        >
          ✅ {tasks.submitted ? 'Day Submitted' : 'Submit Day'}
        </Button>
      </div>

      {/* Weekly Calendar */}
      {showHistory && <WeeklyCalendar />}

      {/* Submission Status */}
      {tasks.submitted && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-600 font-medium">✅ Day successfully submitted!</span>
              {tasks.submitted_at && (
                <span className="text-sm text-green-600">
                  at {new Date(tasks.submitted_at).toLocaleTimeString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}