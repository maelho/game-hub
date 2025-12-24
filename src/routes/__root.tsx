import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import Navbar from '@/components/navbar'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
      </div>
    )
  },
})

function Layout() {
  return (
    <NuqsAdapter
      defaultOptions={{
        clearOnDefault: false,
      }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </NuqsAdapter>
  )
}
