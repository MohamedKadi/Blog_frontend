import Navbar from './components/layout/Navbar';
import BlogsPage from './pages/BlogsPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/blogs', element: <BlogsPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
