import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { PageNotFound } from "../pages/PageNotFound";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { AdminLayout } from "../pages/AdminLayout";
import { AdminDashboard } from "../pages/AdminDashboard";
import PrivateRoute from "../services/Auth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <PageNotFound/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "login", 
                element: <Login/>,
            },
            {
                path: "dashboard", 
                element: <PrivateRoute requiredRole="user">
                    <Dashboard/>
                </PrivateRoute>,
            }
        ]  
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children:[
            {
                index: true,
                element: <PrivateRoute requiredRole="admin">
                    <AdminDashboard/>
                </PrivateRoute>,
            }
        ]

    }
])