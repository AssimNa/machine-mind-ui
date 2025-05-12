
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  ClipboardList,
  ChevronRight,
  History,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Mock data
const assignedTasks = [
  {
    id: 1,
    machine: 'Machine #A2301',
    designation: 'Production Line Conveyor',
    task: 'Lubrication System Maintenance',
    priority: 'high',
    dueDate: '2025-05-15',
  },
  {
    id: 2,
    machine: 'Machine #B1082',
    designation: 'Assembly Station Robot',
    task: 'Sensor Calibration',
    priority: 'medium',
    dueDate: '2025-05-16',
  },
  {
    id: 3,
    machine: 'Machine #C4523',
    designation: 'Hydraulic Press',
    task: 'Fluid Level Check',
    priority: 'low',
    dueDate: '2025-05-18',
  },
  {
    id: 4,
    machine: 'Machine #D9821',
    designation: 'CNC Machine',
    task: 'Tool Replacement',
    priority: 'medium',
    dueDate: '2025-05-20',
  },
];

const scheduledMaintenance = [
  {
    id: 1,
    machine: 'Machine #A2301',
    designation: 'Production Line Conveyor',
    task: 'Belt Inspection',
    time: '10:00 AM',
    date: '2025-05-15',
  },
  {
    id: 2,
    machine: 'Machine #F6721',
    designation: 'Packaging Unit',
    task: 'Mechanical Check',
    time: '2:30 PM',
    date: '2025-05-15',
  },
  {
    id: 3,
    machine: 'Machine #B1082',
    designation: 'Assembly Station Robot',
    task: 'Software Update',
    time: '9:00 AM',
    date: '2025-05-16',
  },
];

const urgentAlerts = [
  {
    id: 1,
    machine: 'Machine #D9821',
    designation: 'CNC Machine',
    issue: 'Abnormal Vibration Detected',
    time: '2 hours ago',
    severity: 'high',
  },
  {
    id: 2,
    machine: 'Machine #A2301',
    designation: 'Production Line Conveyor',
    issue: 'Temperature Above Threshold',
    time: '3 hours ago',
    severity: 'medium',
  },
];

export const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleLogIntervention = () => {
    navigate('/maintenance/tasks/create');
  };

  const handleViewMachineHistory = (machine: string) => {
    toast.info(`Viewing history for ${machine}`);
    // In a real app, this would navigate to the machine's history page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Technician Dashboard</h1>
        <Button onClick={handleLogIntervention}>
          <ClipboardList className="mr-2 h-4 w-4" />
          Log New Intervention
        </Button>
      </div>

      {/* Assigned Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>My Assigned Tasks</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={() => navigate('/maintenance/tasks')}
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.machine}</TableCell>
                    <TableCell>{task.designation}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>
                      <span className={`${getPriorityClass(task.priority)} inline-flex px-2 py-1 text-xs rounded-md`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewMachineHistory(task.machine)}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleLogIntervention}
                        >
                          <Wrench className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Urgent Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Urgent Alerts</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={() => navigate('/alerts')}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentAlerts.length > 0 ? (
                urgentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start p-3 rounded-lg bg-accent/50"
                  >
                    <div className="mr-3 mt-0.5">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">
                          {alert.machine} - {alert.designation}
                        </p>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getSeverityClass(alert.severity)}`}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm">{alert.issue}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                        <Button size="sm" variant="outline" onClick={() => handleLogIntervention()}>
                          <Wrench className="h-3 w-3 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No urgent alerts at this time</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="calendar">
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar" className="mt-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border pointer-events-auto"
                />
                <div className="mt-4 space-y-2">
                  {scheduledMaintenance
                    .filter(item => item.date === '2025-05-15')
                    .map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.task}</span>
                        </div>
                        <Badge variant="outline">{item.time}</Badge>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="list" className="mt-2">
                <div className="space-y-4">
                  {scheduledMaintenance.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start p-3 rounded-lg bg-accent/50"
                    >
                      <div className="mr-3 mt-0.5">
                        <CalendarIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {item.machine} - {item.designation}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {item.date} at {item.time}
                          </span>
                        </div>
                        <p className="text-sm">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/maintenance/tasks')}>
              <ClipboardList className="h-6 w-6 mb-2" />
              <span>Maintenance Tasks</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/maintenance/schedules')}>
              <CalendarIcon className="h-6 w-6 mb-2" />
              <span>Maintenance Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/machines')}>
              <History className="h-6 w-6 mb-2" />
              <span>Machine History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
