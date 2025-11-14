export function Home() {
    return (
        <>
            <main className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-white px-6">
                <div className="max-w-2xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#2D3640] leading-tight">
                        ProdSense
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-gray-600">
                        Monitoramento ambiental inteligente para produtividade e bem-estar.
                    </p>

                    <button
                        className="mt-8 px-8 py-3 bg-[#456486] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#365572] transition"
                    >
                        Testar agora
                    </button>
                </div>
            </main>
        </>
    )
}