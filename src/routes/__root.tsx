import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
  notFoundComponent: () => {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="mono-data text-industrial-accent text-lg">404</p>
          <p className="text-industrial-text-tertiary text-sm">PAGE_NOT_FOUND</p>
        </div>
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
      <div className="flex min-h-screen flex-col bg-industrial-primary">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </NuqsAdapter>
  )
}
