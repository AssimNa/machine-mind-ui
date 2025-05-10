
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useHotkeys } from '@/hooks/use-hotkeys';

// Mock data for search results - would be replaced with real data in production
const mockSearchResults = {
  machines: [
    { id: 1, name: "CNC Machine #1", route: "/machines/1" },
    { id: 2, name: "Assembly Line #3", route: "/machines/2" },
    { id: 3, name: "Packaging Unit #2", route: "/machines/3" },
  ],
  tasks: [
    { id: 1, name: "Hydraulic System Maintenance", route: "/maintenance/tasks" },
    { id: 2, name: "Belt Replacement", route: "/maintenance/tasks" },
    { id: 3, name: "Calibration", route: "/maintenance/tasks" },
  ],
  parts: [
    { id: 1, name: "Hydraulic Filter HF-238", route: "/inventory" },
    { id: 2, name: "Drive Belt B-450", route: "/inventory" },
    { id: 3, name: "Control Board CB-17X", route: "/inventory" },
  ],
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Register keyboard shortcut
  useHotkeys("ctrl+k, cmd+k", (e) => {
    e.preventDefault();
    setOpen((open) => !open);
  });

  const handleSelect = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <>
      {/* Clickable search input that opens command dialog */}
      <div 
        className="relative w-full max-w-md cursor-pointer" 
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-muted-foreground">
          Search machines, tasks, parts... (Ctrl+K)
        </div>
      </div>
      
      {/* Command dialog for search results */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search machines, tasks, parts..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Machines">
            {mockSearchResults.machines.map((item) => (
              <CommandItem 
                key={item.id}
                onSelect={() => handleSelect(item.route)}
                className="cursor-pointer"
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="Maintenance Tasks">
            {mockSearchResults.tasks.map((item) => (
              <CommandItem 
                key={item.id}
                onSelect={() => handleSelect(item.route)}
                className="cursor-pointer"
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="Inventory Parts">
            {mockSearchResults.parts.map((item) => (
              <CommandItem 
                key={item.id}
                onSelect={() => handleSelect(item.route)}
                className="cursor-pointer"
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
