
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const RestrictedAccess = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-amber-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You don't have permission to access this page. This feature is restricted to users with administrative privileges.
      </p>
      <Button onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </Button>
    </div>
  );
};
