
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

// Sample data for a machine
const machineData = {
  '1': {
    name: 'CNC Machine #1',
    type: 'CNC',
    model: 'Haas VF-2',
    manufacturer: 'Haas Automation',
    serialNumber: '1234-5678-90',
    purchaseDate: '2023-01-15',
    warrantyExpiration: '2026-01-15',
    department: 'Production',
    location: 'Floor 1, Bay A',
    description: 'Vertical machining center with 40x20x25" travel'
  },
  '2': {
    name: 'Assembly Line #3',
    type: 'Assembly',
    model: 'Custom AL-230',
    manufacturer: 'Internal Build',
    serialNumber: 'AL-2022-003',
    purchaseDate: '2022-06-10',
    warrantyExpiration: 'N/A',
    department: 'Production',
    location: 'Floor 1, Bay C',
    description: 'Custom assembly line for product line B'
  }
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.string().min(1, { message: "Please select a machine type." }),
  model: z.string().min(1, { message: "Model is required." }),
  manufacturer: z.string().min(1, { message: "Manufacturer is required." }),
  serialNumber: z.string().min(1, { message: "Serial number is required." }),
  purchaseDate: z.string().optional(),
  warrantyExpiration: z.string().optional(),
  department: z.string().min(1, { message: "Department is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  description: z.string().optional(),
});

const EditMachinePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const machine = id ? machineData[id] : null;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: machine?.name || '',
      type: machine?.type || '',
      model: machine?.model || '',
      manufacturer: machine?.manufacturer || '',
      serialNumber: machine?.serialNumber || '',
      purchaseDate: machine?.purchaseDate || '',
      warrantyExpiration: machine?.warrantyExpiration || '',
      department: machine?.department || '',
      location: machine?.location || '',
      description: machine?.description || '',
    }
  });
  
  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Machine Not Found</h2>
        <p className="mb-6">The machine you are trying to edit does not exist.</p>
        <Button onClick={() => navigate('/machines')}>
          Return to Machines
        </Button>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Machine updated successfully");
    setTimeout(() => navigate('/machines'), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/machines')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Machine</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machine Information</CardTitle>
          <CardDescription>Edit details for this machine</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="CNC Machine #1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select machine type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CNC">CNC</SelectItem>
                          <SelectItem value="Assembly">Assembly Line</SelectItem>
                          <SelectItem value="Robot">Robotic Arm</SelectItem>
                          <SelectItem value="Packaging">Packaging Unit</SelectItem>
                          <SelectItem value="Molding">Injection Molder</SelectItem>
                          <SelectItem value="Painting">Paint Booth</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Model number or name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <FormControl>
                        <Input placeholder="Manufacturer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Machine serial number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="warrantyExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty Expiration</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave empty if no warranty or not applicable
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Production">Production</SelectItem>
                          <SelectItem value="Assembly">Assembly</SelectItem>
                          <SelectItem value="Shipping">Shipping</SelectItem>
                          <SelectItem value="Finishing">Finishing</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Floor 1, Bay A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional details about this machine"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/machines')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Update Machine
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMachinePage;
