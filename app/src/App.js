import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Loyaut from  './components/pages/Layout';
import HomePage from './components/pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Loyaut />,
    children: [
      {
        path: '',
        element: <HomePage />,
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
