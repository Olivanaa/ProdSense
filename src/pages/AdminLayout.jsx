import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function AdminLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}