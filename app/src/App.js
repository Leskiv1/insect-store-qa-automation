import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/HomePage";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import CardPage from './components/pages/CardsPage/CardsPage';
import {Provider} from "react-redux";
import store from './assets/store/store'
import CartPage from "./components/pages/cartPage/CartPage";
import SignupForm from "./components/pages/FormPage/FormPage";
import SuccessPage from './components/pages/SuccessPage/SuccessPage';

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
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'signup', // Новий маршрут для форми
        element: <SignupForm />
      },
      {
        path: 'success', // Новий маршрут для форми
        element: <SuccessPage />
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  );
}

export default App;
