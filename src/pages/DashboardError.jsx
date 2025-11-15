import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export function DashboardError({ message, onRetry }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center bg-red-500/20 rounded-full">
              <AlertCircle className="w-16 h-16 text-red-400" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Oops!
            </h2>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Algo deu errado
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {message || "Não conseguimos carregar os dados do dashboard. Tente novamente ou volte para a página inicial."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {onRetry && (
              <button
                onClick={onRetry}
                className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Tentar Novamente</span>
              </button>
            )}
            <Link to="/">
              <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-all duration-200 flex items-center space-x-2">
                <span>Voltar para Home</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
