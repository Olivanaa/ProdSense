import { useState } from "react"
import { Link } from "react-router-dom"

export default function NavbarHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const listItems = [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Sobre', href: '/#' },
        { name: 'Contato', href: '/contact' }
    ]

    return (
        <>
            <nav className="md:fixed bg-[#121f3a]/60 flex justify-between items-center gap-16 py-3 px-10 md:left-1/2 md:translate-x-[-50%] md:top-5 md:rounded-full text-white shadow-lg md:z-10 backdrop-blur-md">
                <div className="hidden md:flex items-center gap-10">
                    <img src="src/assets/logo_prod_sense.png" alt="" className="h-20 w-20" />

                    <ul className="flex gap-8 text-xl">
                        {listItems.map((item) => (
                            <li className="cursor-pointer" key={item.name}>
                                <Link to={item.href}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-200">Login</Link>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-blue-300 focus:outline-none transition-colors duration-200 p-2"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#121f3a] z-40 md:hidden pt-32">
                    <div className="flex flex-col items-center space-y-8 px-6">
                        <div className="mb-8">
                            <img
                                src="src\assets\logo_prod_sense.png"
                                alt="ProdSense"
                                className="h-24 w-24 mx-auto"
                            />
                        </div>


                        {listItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-2xl font-medium text-white hover:text-blue-300 transition-colors duration-200 w-full text-center py-4 border-b border-gray-700/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="pt-8 w-full max-w-xs">
                            <a
                                href="#"
                                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-200 w-full text-center block"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </a>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors duration-200 p-2"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}