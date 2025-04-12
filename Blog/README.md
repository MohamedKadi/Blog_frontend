# React Blog Platform

A full-featured blogging platform built with React, allowing users to create, read, update, and delete blog posts.

## Features

- 🔐 User Authentication (Login/Signup)
- 📝 Create and Publish Blog Posts
- 📖 Read Blog Posts
- ✏️ Edit Your Own Posts
- 🗑️ Delete Your Own Posts
- 👤 User Profiles
- 🔒 Protected Routes

## Technologies Used

- React
- React Router DOM
- Tailwind CSS
- JWT Authentication
- Environment Variables
- RESTful API Integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server (Make sure it's running)

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd Blog
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URLL=your_api_url
VITE_API_REGISTER=your_register_endpoint
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
Blog/
├── src/
│   ├── components/
│   │   ├── blogs/
│   │   │   └── Blog.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Hero.jsx
│   │   └── ui/
│   │       └── Button.jsx
│   ├── context/
│   │   └── AuthProvider.jsx
│   ├── pages/
│   │   ├── BlogPage.jsx
│   │   ├── BlogsPage.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── MyBlogs.jsx
│   │   └── SignUp.jsx
│   ├── App.jsx
│   └── main.jsx
```

## Features in Detail

### Authentication

- User registration with email and password
- JWT-based authentication
- Protected routes for authenticated users

### Blog Management

- Create new blog
- View all blogs
- Edit your own blog
- Delete your own blog
- View individual blog

## API Integration

The application integrates with a RESTful API (Blog API) using the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/posts` - Fetch all blogs
- `GET /api/posts/:id` - Fetch single blog
- `POST /api/posts` - Create new blog
- `PUT /api/posts/:id` - Update blog
- `DELETE /api/posts/:id` - Delete blog
- `GET /api/posts/myblogs` - Fetch user's blogs
