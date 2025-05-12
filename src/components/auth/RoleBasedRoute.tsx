
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type RoleBasedRouteProps = {
  adminComponent: React.ReactNode;
  technicianComponent?: React.ReactNode;
  viewerComponent?: React.ReactNode;
  fallback?: string;
};

export const RoleBasedRoute = ({
  adminComponent,
  technicianComponent,
  viewerComponent,
  fallback = '/dashboard'
}: RoleBasedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'admin':
      return <>{adminComponent}</>;
    case 'technician':
      return <>{technicianComponent || (fallback ? <Navigate to={fallback} /> : adminComponent)}</>;
    case 'viewer':
      return <>{viewerComponent || (fallback ? <Navigate to={fallback} /> : adminComponent)}</>;
    default:
      return <Navigate to={fallback} />;
  }
};
