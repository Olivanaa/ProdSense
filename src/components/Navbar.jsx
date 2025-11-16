import { Link } from "react-router-dom"
import { getLoggedUser, logout } from "../services/Auth"
import { LogOut, Menu, User, X } from "lucide-react"
import { useState } from "react"

const listItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Sobre', href: '/about' },
    { name: 'Contato', href: '/contact' }
]

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const usuario = getLoggedUser()

    return (
        <>
            <nav className="bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-between px-6 h-16 border-b border-gray-800">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="font-title text-2xl font-bold text-[#dfe5eb]">PRODSENSE</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                    <ul className="flex gap-8 text-base text-white font-medium">
                        {listItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="hover:text-gray-300 transition-colors duration-200 flex items-center h-16 border-b-2 border-transparent hover:border-gray-400"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop User Area */}
                <div className="hidden md:flex items-center gap-4">
                    {usuario && (
                        <div className="flex items-center gap-2 text-white text-sm">
                            <User size={16} />
                            <span>{usuario.nome}</span>
                        </div>
                    )}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-white text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Sair
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800">
                    <ul className="flex flex-col py-4">
                        {listItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="block px-6 py-3 text-white hover:bg-gray-800 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="px-6 py-3">
                            <button
                                onClick={() => {
                                    logout()
                                    setMenuOpen(false)
                                }}
                                className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-white text-sm font-medium"
                            >
                                <LogOut size={16} />
                                Sair
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}