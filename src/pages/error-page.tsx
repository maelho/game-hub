import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NavBar from "../components/nav-bar";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Ooops!</h1>
        <p className="text-lg">
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </p>
      </div>
    </>
  );
}
