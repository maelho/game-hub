import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import type { Query } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { type PersistQueryClientOptions, PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { platformsQueryOptions } from '@/lib/query-options'
import { routeTree } from './routeTree.gen'

import '@/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      experimental_prefetchInRender: true,
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
})

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'GAME_HUB_QUERY_CACHE',
  throttleTime: 1000,
})

const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister,
  maxAge: 24 * 60 * 60 * 1000,
  buster: 'v1',
  dehydrateOptions: {
    shouldDehydrateQuery: (query: Query) => {
      if (query.state.status !== 'success') return false

      const [scope, type] = query.queryKey

      if (scope !== 'games') return false

      return type === 'platforms' || type === 'detail' || type === 'screenshots'
    },
  },
}

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: false,
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  basepath: '/game-hub',
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      onSuccess={() => queryClient.prefetchQuery(platformsQueryOptions())}
      persistOptions={persistOptions}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  </StrictMode>,
)
