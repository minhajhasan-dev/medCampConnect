import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AvailableCamps from "../pages/Available Camps/AvailableCamps";
import CampDetails from "../pages/Camp Details/CampDetails";
import Analytics from "../pages/Dashboard/Common/Analytics";
import Profile from "../pages/Dashboard/Common/Profile";
import AddCamp from "../pages/Dashboard/Organizer/AddCamp";
import ManageCamps from "../pages/Dashboard/Organizer/ManageCamps";
import ManageRegisteredCamps from "../pages/Dashboard/Organizer/ManageRegisteredCamps";
import PaymentHistory from "../pages/Dashboard/Participant/PaymentHistory";
import RegisteredCamps from "../pages/Dashboard/Participant/RegisteredCamps";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps />,
      },
      {
        path: "/camp-details/:campId",
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <PrivateRoute>
            <AddCamp />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-camps",
        element: (
          <PrivateRoute>
            <ManageCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-registered-camps",
        element: (
          <PrivateRoute>
            <ManageRegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <PrivateRoute>
            <RegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
