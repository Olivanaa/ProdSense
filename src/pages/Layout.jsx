import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Layout() {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black ">
                
                <div className="pt-20">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}