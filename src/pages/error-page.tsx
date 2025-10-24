import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import NavBar from '../components/nav-bar'

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="mb-4 font-bold text-4xl">Ooops!</h1>
        <p className="text-lg">
          {isRouteErrorResponse(error) ? 'This page does not exist.' : 'An unexpected error occurred.'}
        </p>
      </div>
    </>
  )
}
