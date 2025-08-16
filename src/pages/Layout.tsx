import NavBar from "../components/nav-bar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
