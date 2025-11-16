import { useState } from "react";

export default function ContactForm() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !message) {
            setSuccess("Por favor, preencha todos os campos");
            return;
        }

        setIsLoading(true);
        setSuccess(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccess("Mensagem enviada com sucesso!");
            setNome("");
            setEmail("");
            setMessage("");
        } catch {
            setSuccess("Erro ao enviar a mensagem. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-lg space-y-6"
        >
            <div>
                <label className="block text-gray-300 mb-2 font-medium">Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Seu nome"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-2 font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="seu@email.com"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-2 font-medium">Mensagem</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Escreva sua mensagem..."
                    required
                ></textarea>
            </div>

            {success && <p className="text-center text-green-400">{success}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all hover:bg-blue-700 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                ) : (
                    "Enviar Mensagem"
                )}
            </button>
        </form>
    );
}
