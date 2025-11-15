import EnvironmentStates from "../utils/environmentStates";

export default function EnvironmentCard({ title, value, unit = "", type }) {
    const state = (() => {
        switch(type) {
        case "temperature": return EnvironmentStates.getTempState(value);
        case "humidity":    return EnvironmentStates.getHumidityState(value);
        case "light":       return EnvironmentStates.getLightState(value);
        case "noise":       return EnvironmentStates.getNoiseState(value);
        case "air":         return EnvironmentStates.getAirState(value);
        case "pci":         return EnvironmentStates.getPCIState(value);
        default:            return null;
        }
    })();

    const message = (() => {
        switch(type) {
        case "temperature": return EnvironmentStates.getTempMessage(value);
        case "humidity":    return EnvironmentStates.getHumidityMessage(value);
        case "light":       return EnvironmentStates.getLightMessage(value);
        case "noise":       return EnvironmentStates.getNoiseMessage(value);
        case "air":         return EnvironmentStates.getAirMessage(value);
        case "pci":         return EnvironmentStates.getPCIDescription(value);
        default:            return "";
        }
    })();

    return (
        <div className="rounded-2xl p-8 border transition-all duration-300 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
            <div className="flex justify-between items-center">
                <p className="text-white text-2xl mb-2">{value} {unit}</p>
                {EnvironmentStates.getStateIcon(state)}
            </div>
            <p className="text-gray-100">{message}</p>
        </div>
    );
}
