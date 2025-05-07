import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Jobs from "./screens/Jobs";
import Browse from "./screens/Browse";
import Profile from "./screens/Profile";
import JobDescription from "./screens/JobDescription";
import Companies from "./screens/Admin/Companies";
import CompanyCreate from "./screens/Admin/CompanyCreate";
import CompanySetup from "./screens/Admin/CompanySetup";
import AdminJobs from "./screens/Admin/AdminJobs";
import PostJob from "./screens/Admin/PostJob";
import Applicants from "./screens/Admin/Applicants";
import ProtectedRoute from "./screens/Admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  // Routes for students
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // Routes for recruiter
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
