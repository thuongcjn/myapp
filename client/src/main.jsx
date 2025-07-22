import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import DeletePostPage from "./pages/DeletePostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/logout",
    element: <App />,
    children: [
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
  },
  {
    path: "/posts/:id",
    element: <App />,
    children: [
      {
        path: "/posts/:id",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/create-post",
    element: <App />,
    children: [
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: "/edit-post/:id",
    element: <App />,
    children: [
      {
        path: "/edit-post/:id",
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: "/delete-post/:id",
    element: <App />,
    children: [
      {
        path: "/delete-post/:id",
        element: <DeletePostPage />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
