import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/User/Home/HomePage.jsx";
import SignUp from "../Pages/User/Signup/UserSignUp.jsx";
import UserProfile from "../Pages/User/UserProfile/UserProfilePage.jsx";
import DriverSignup from "../Pages/Driver/Signup/SignupPage.js";
import CompleteProfilePage from "../Pages/Driver/CompleteProfile/CompleteProfilePage.jsx";
import DriverLoginPage from "../Pages/Driver/Login/DriverLoginPage.jsx";
import DriverProfilePage from "../Pages/Driver/Profile/DriverProfilePage.jsx";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard.jsx";
import DriverList from "../Pages/Admin/DriverList.jsx";
import DriverDetailsPage from "../Pages/Admin/DriverDetailsPage.jsx";
import AdminLogin from "../Pages/Admin/AdminLogin.jsx";
import DriverMainPage from "../Pages/Driver/DriverMainPage/DriverMainPage.jsx";
import AdminProtected from "./AdminProtected.jsx";
import DriverProtected from "./DriverProtected.js";
import Approval from "../Pages/Driver/ApprovalUI/Approval.jsx";
import UsersList from "../Pages/Admin/UsersList.jsx";
import UserProtected from "./UserProtected.js";
import RidePage from "../Pages/User/Trip/RidePage.jsx";
import Trip from "../Pages/Driver/Trip/Trip.jsx";
import LiveLocation from "../Pages/User/Trip/LiveLocation.jsx";
import TripHistory from "../Pages/User/TripHistory/TripHistory.jsx";
import PaymentSucess from "../Pages/User/Payment/PaymentSucess.jsx";
import TripDetailPage from "../Pages/User/TripHistory/TripDetailPage.jsx";
import WalletPage from "../Pages/User/Profile/WalletPage.jsx";
import AddContacts from "../Pages/User/AddContacts/AddContacts.jsx";
import DriverWalletPage from "../Pages/Driver/Wallet/DriverWalletPage.jsx";
import TripReport from "../Pages/Admin/TripReport.jsx";
import TripProtectedRoute from "./TripProtectedRoute.jsx";

function RouteConfig() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <SignUp />,
    },
    {
      path: "/userprofile",
      element: (
        <UserProtected>
          <UserProfile />
        </UserProtected>
      ),
    },
    {
      path: "/search-ride",

      element: (
        <UserProtected>
          <TripProtectedRoute>
            <RidePage />
          </TripProtectedRoute>
        </UserProtected>
      ),
    },
    {
      path: "/trip",
      element: (
        <UserProtected>
          <LiveLocation />
        </UserProtected>
      ),
    },
    {
      path: "/trip-history",
      element: (
        <UserProtected>
          <TripHistory />
        </UserProtected>
      ),
    },
    {
      path: "/trip-detail/:tripId",
      element: (
        <UserProtected>
          <TripDetailPage />
        </UserProtected>
      ),
    },
    {
      path: "/payment-success",
      element: (
        <UserProtected>
          <PaymentSucess />
        </UserProtected>
      ),
    },
    {
      path: "/wallet",
      element: (
        <UserProtected>
          <WalletPage />
        </UserProtected>
      ),
    },
    {
      path: "/add-contacts",
      element: (
        <UserProtected>
          <AddContacts />
        </UserProtected>
      ),
    },
    {
      path: "/driver",
      children: [
        {
          path: "signup",
          element: <DriverSignup />,
        },
        {
          path: "login",
          element: <DriverLoginPage />,
        },
        {
          path: "complete-profile",
          element: <CompleteProfilePage />,
        },
        {
          path: "profile",
          element: (
            <DriverProtected>
              <DriverProfilePage />
            </DriverProtected>
          ),
        },
        {
          path: "home",
          element: (
            <DriverProtected>
              <DriverMainPage />
            </DriverProtected>
          ),
        },
        {
          path: "approval",
          element: <Approval />,
        },

        {
          path: "trip",
          element: (
            <DriverProtected>
              <Trip />
            </DriverProtected>
          ),
        },
        {
          path: "wallet",
          element: (
            <DriverProtected>
              <DriverWalletPage />
            </DriverProtected>
          ),
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element: (
            <AdminProtected>
              <AdminDashBoard />
            </AdminProtected>
          ),
        },
        {
          path: "login",
          element: <AdminLogin />,
        },
        {
          path: "home",
          element: (
            <AdminProtected>
              <AdminDashBoard />
            </AdminProtected>
          ),
        },
        {
          path: "driver-list",
          element: (
            <AdminProtected>
              <DriverList />
            </AdminProtected>
          ),
        },
        {
          path: "viewdriver-detail/:driverId",
          element: (
            <AdminProtected>
              <DriverDetailsPage />
            </AdminProtected>
          ),
        },
        {
          path: "users-list",
          element: (
            <AdminProtected>
              <UsersList />
            </AdminProtected>
          ),
        },
        {
          path: "trip-report",
          element: (
            <AdminProtected>
              <TripReport />
            </AdminProtected>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default RouteConfig;
