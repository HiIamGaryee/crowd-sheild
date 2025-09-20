import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/HomePage";
import { AuthProvider } from "./AuthProvider";
import Faq from "./pages/FaqPage";
import WizardzPage from "./pages/landings/wizardz";
import DashboardPage from "./pages/DashbaordPage";
import WhatIfPage from "./pages/WhatIfPage";
import HelpPage from "./pages/HelpPage";

import ErrorPage from "./pages/ErrorPage";

// Layout component that specifies the default error element
const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout as the top-level route element
    errorElement: <ErrorPage />, // Set a default error element here
    children: [
      { path: "/", element: <Home /> },
      { path: "/faq", element: <Faq /> },
      { path: "/wizardz", element: <WizardzPage /> },

      // Dashboard Routes
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/what-if", element: <WhatIfPage /> },
      { path: "/help", element: <HelpPage /> },

      // {
      //   path: "/member/profile",
      //   element: (
      //     <ProtectedRoute>
      //       <Profile />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
