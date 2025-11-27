import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

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
    <>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
      <ReactQueryDevtools buttonPosition="top-right" />

      {/* <TanStackRouterDevtools /> */}
    </>
  )
}
