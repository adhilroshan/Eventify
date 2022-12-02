import React from 'react'
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "mapbox-gl/dist/mapbox-gl.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import UserDashboard from './pages/UserDashboard';
import CreateEvent from './components/CreateEvent';
import ImgUpload from './components/ImgUpload';
import SignUp from './components/Signup';
import CreateHost from './components/CreateHost';
import CreateUser from './components/CreateUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <UserDashboard />,
  }
  ,{
    path: "/create-event",
    element: <CreateEvent />,
  }
  ,{
    path: "/upload",
    element: <ImgUpload />,
  }
  ,{
    path: "/signup",
    element: <SignUp />,
  }
  ,{
    path: "/create-host",
    element: <CreateHost />,
  }
  ,{
    path: "/register",
    element: <CreateUser />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

serviceWorkerRegistration.register();