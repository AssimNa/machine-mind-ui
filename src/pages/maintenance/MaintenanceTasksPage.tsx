
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Wrench, 
  Search, 
  FilterX, 
  ChevronDown, 
  ClipboardList,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const MaintenanceTasksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isTechnician = user?.role === 'technician';
  const [activeTab, setActiveTab] = useState('all');
  
  const handleCreateTask = () => {
    navigate('/maintenance/tasks/create');
  };

  const handleViewHistory = (machineId: number) => {
    toast.info(`Viewing history for machine #${machineId}`);
    // In a real app, this would navigate to the machine's history page
  };

  const handleLogIntervention = (taskId: number) => {
    toast.success(`Recording intervention for task #${taskId}`);
    // In a real app, this would open an intervention form for the specific task
  };
  
  const tasks = [
    {
      id: 1,
      title: 'Replace bearings',
      machine: 'Machine #A2301',
      designation: 'Production Line Conveyor',
      nIdentification: 'ID-PL-2301',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Michael Johnson',
      dueDate: '2025-05-15'
    },
    {
      id: 2,
      title: 'Lubricate conveyor system',
      machine: 'Machine #B4502',
      designation: 'Conveyor System',
      nIdentification: 'ID-CV-4502',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: 'Sarah Williams',
      dueDate: '2025-05-18'
    },
    {
      id: 3,
      title: 'Check hydraulic fluid levels',
      machine: 'Machine #C7801',
      designation: 'Hydraulic Press',
      nIdentification: 'ID-HP-7801',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'John Smith',
      dueDate: '2025-05-10'
    },
    {
      id: 4,
      title: 'Calibrate sensors',
      machine: 'Machine #D9234',
      designation: 'Assembly Station',
      nIdentification: 'ID-AS-9234',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: 'Emma Davis',
      dueDate: '2025-05-20'
    },
    {
      id: 5,
      title: 'Replace air filters',
      machine: 'Machine #E1567',
      designation: 'HVAC System',
      nIdentification: 'ID-HV-1567',
      priority: 'Low',
      status: 'In Progress',
      assignedTo: 'Michael Johnson',
      dueDate: '2025-05-16'
    }
  ];

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.status.toLowerCase().replace(' ', '') === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isTechnician ? 'My Assigned Tasks' : 'Maintenance Tasks'}
        </h1>
        {(user?.role === 'admin' || user?.role === 'technician') && (
          <Button onClick={handleCreateTask}>
            {isTechnician ? (
              <>
                <ClipboardList className="mr-2 h-4 w-4" />
                Log Intervention
              </>
            ) : (
              <>
                <Wrench className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Task</div>
                  <div>Machine</div>
                  <div>Designation</div>
                  <div>Priority</div>
                  <div>Status</div>
                  <div>Due Date</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-8 p-4 text-sm items-center hover:bg-muted/50">
                      <div className="col-span-2 font-medium">{task.title}</div>
                      <div>{task.machine}</div>
                      <div>{task.designation}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <div>{task.dueDate}</div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewHistory(task.id)}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        {isTechnician && (task.status !== 'Completed') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleLogIntervention(task.id)}
                          >
                            <ClipboardList className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceTasksPage;
