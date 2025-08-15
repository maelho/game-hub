import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
