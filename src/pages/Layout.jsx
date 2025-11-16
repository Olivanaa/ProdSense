import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black ">

                <Outlet />

                <Footer />
            </div>
        </>
    )
}