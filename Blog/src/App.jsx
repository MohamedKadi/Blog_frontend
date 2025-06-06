import Navbar from './components/layout/Navbar';
import BlogsPage from './pages/BlogsPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreateBlog from './pages/createBlog';
import BlogPage from './pages/BlogPage';
import MyBlogs from './pages/MyBlogs';
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
        { path: '/signup', element: <SignUp /> },
        { path: '/login', element: <Login /> },
        { path: '/create-blog', element: <CreateBlog /> },
        { path: '/blogs/:id', element: <BlogPage /> },
        { path: '/myblogs', element: <MyBlogs /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
