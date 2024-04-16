"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const client = new QueryClient();

interface QueryClientComponentProps {
  children: ReactNode;
}

export function QueryClientComponent({ children }: QueryClientComponentProps) {

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};