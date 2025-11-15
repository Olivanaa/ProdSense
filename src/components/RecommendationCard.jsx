import EnvironmentStates from "../utils/environmentStates";

export default function RecommendationCard({ pci }) {
    return (
        <div
            className={`border rounded-2xl p-6 max-w-3xl shadow-lg text-center 
                ${EnvironmentStates.getStateColors(EnvironmentStates.getPCIState(pci)
            )}`}
        >
            {EnvironmentStates.getStateIcon(EnvironmentStates.getPCIState(pci))}

            <h2 className="text-xl font-bold text-white mb-4">
                Recomendação do Ambiente
            </h2>
            <p className="text-white text-lg">
                {EnvironmentStates.getGeneralRecommendation(pci)}
            </p>
        </div>
    );
}
