"use client";

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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