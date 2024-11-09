import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "antd";
import { RootLayout } from "src/components/layouts/RootLayout";
import { ThemeProvider } from "src/contexts/ThemeContext";
import NotFoundPage from "./404";
import { generateRoutes } from "src/utils/routes";

// @ts-ignore
const routes = generateRoutes(require.context("./", true, /\.tsx$/));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: routes.map((route) => ({
      path: route.path,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <route.element />
        </Suspense>
      ),
    })),
  },
]);

export const Pages = () => {
  return (
    <ThemeProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </ThemeProvider>
  );
};
