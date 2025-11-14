import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { PageNotFound } from "../pages/PageNotFound";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { AdminLayout } from "../pages/AdminLayout";
import { AdminDashboard } from "../pages/AdminDashboard";

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
                element: <Dashboard/>,
            }
        ]  
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children:[
            {
                index: true,
                element: <AdminDashboard/>,
            }
        ]

    }
])