import { Link } from "react-router-dom";

export function Login() {
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
                            <form action="" className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
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
                                        id="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Sua senha"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Entrar
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