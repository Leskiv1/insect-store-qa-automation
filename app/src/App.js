import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/HomePage";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import InsectsProvider from './components/context/InsectsContext';
import CardPage from './components/pages/CardsPage/CardsPage';

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
        path: 'catalog/:id',
        element: <CardPage />
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
    <InsectsProvider>
    <RouterProvider router={router} />
  </InsectsProvider>
  );
}

export default App;
