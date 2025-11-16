import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function AdminLayout() {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black ">
                <Outlet />
                <Footer />
            </div>
        </>
    )
}