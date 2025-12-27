import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import Footer from '@/components/footer'
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
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </NuqsAdapter>
  )
}
