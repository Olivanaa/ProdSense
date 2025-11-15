import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginSenha, setLoginSenha] = useState("")
    const [loginError, setLoginError] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!loginEmail || !loginSenha) {
            setLoginError("Por favor, preencha todos os campos")
            return;
        }

        setLoginError("")

        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/usuarios?email=${loginEmail}&senha=${loginSenha}`)
            const data = await response.json()


            if (data.length === 0) {
                setLoginError("Email ou senha incorretos")
                return
            }

            const usuario = data[0]
            console.log("Usuário logado:", usuario)

            const token = btoa(`${usuario.email}:${usuario.senha}`)
            localStorage.setItem("token", token)
            localStorage.setItem("usuario", JSON.stringify(usuario))

            if (usuario.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/dashboard")
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error)
            setLoginError("Erro ao tentar logar. Tente novamente mais tarde.")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <main className="flex h-screen">
                <section className="hidden lg:block lg:w-1/2">
                    <img src="src\assets\prodsense_logo.png" alt="" />
                </section>
                <section className="w-full lg:w-1/2 bg-gradient-to-br from-[#dfe5eb] to-[#dadcdd] flex items-center justify-center p-8">
                    <div className="flex items-center justify-center align-itms-center h-full w-full">
                        <div className="border border-gray-300 rounded-2xl p-12 bg-white/80 backdrop-blur-sm shadow-2xl w-full max-w-md">
                            <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Bem-vindo</h1>
                            <p className="text-gray-600 text-center mb-8">Faça login em sua conta</p>
                            <form onSubmit={handleLogin} className="space-y-6">
                                {loginError && (
                                    <p className="text-red-500 text-sm text-center">{loginError}</p>
                                )}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Senha
                                        </label>
                                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                            Esqueceu a senha?
                                        </a>
                                    </div>
                                    <input
                                        type="password"
                                        value={loginSenha}
                                        onChange={(e) => setLoginSenha(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Sua senha"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg transform transition ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer hover:shadow-xl transform hover:scale-105"
                                            }`}

                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                                Entrando...
                                            </span>

                                        ) : (
                                            "Entrar"
                                        )}
                                    </button>
                                    <Link to="/" className="flex-1">
                                        <button
                                            type="button"
                                            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 flex items-center justify-center space-x-2"
                                        >
                                            Voltar
                                        </button>
                                    </Link>
                                </div>
                                <div className="text-center mt-6">
                                    <span className="text-gray-600">Não tem uma conta? </span>
                                    <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                                        Cadastre-se
                                    </a>
                                </div>
                            </form>
                            <div className="mt-8 pt-6 border-t border-gray-300">
                                <p className="text-xs text-gray-500 text-center">
                                    Ao fazer login, você concorda com nossos{" "}
                                    <a href="#" className="text-blue-600 hover:text-blue-800">Termos de Serviço</a>{" "}
                                    e{" "}
                                    <a href="#" className="text-blue-600 hover:text-blue-800">Política de Privacidade</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}