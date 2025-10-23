import { Outlet } from 'react-router-dom'
import NavBar from '../components/nav-bar'

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
