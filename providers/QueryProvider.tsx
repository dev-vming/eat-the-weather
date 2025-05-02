'use client';
// providers/QueryClientProvider.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
