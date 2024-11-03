import React from 'react';
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/HomePage";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: '*',
        element: <h1>Page not found</h1>,
      }
    ]
  }
])

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
