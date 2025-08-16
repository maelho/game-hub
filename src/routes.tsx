import { createBrowserRouter } from "react-router-dom";
import GameDetailPage from "./pages/game-detail-page";
import HomePage from "./pages/home-page";
import Layout from "./pages/layout";
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
