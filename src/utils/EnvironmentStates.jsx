import { CircleCheck, CircleMinus, CircleAlert, CircleX } from "lucide-react";

const EnvironmentStates = {
    getLightState(lux) {
        if (lux <= 20 || lux > 5000) return "CRITICAL";
        if ((lux > 20 && lux <= 100) || (lux > 1200 && lux <= 5000)) return "POOR";
        if ((lux > 100 && lux <= 200) || (lux > 800 && lux <= 1200)) return "MODERATE";
        if ((lux > 200 && lux <= 350) || (lux > 650 && lux <= 800)) return "GOOD";
        return "EXCELLENT";
    },

    getTempState(temp) {
        if (temp >= 22 && temp <= 24) return "EXCELLENT";
        if ((temp >= 20 && temp < 22) || (temp > 24 && temp <= 26)) return "GOOD";
        if ((temp >= 18 && temp < 20) || (temp > 26 && temp <= 28)) return "MODERATE";
        if ((temp >= 16 && temp < 18) || (temp > 28 && temp <= 30)) return "POOR";
        return "CRITICAL";
    },

    getHumidityState(humidity) {
        if (humidity >= 45 && humidity <= 55) return "EXCELLENT";
        if ((humidity >= 40 && humidity < 45) || (humidity > 55 && humidity <= 60)) return "GOOD";
        if ((humidity >= 30 && humidity < 40) || (humidity > 60 && humidity <= 70)) return "MODERATE";
        if ((humidity >= 20 && humidity < 30) || (humidity > 70 && humidity <= 80)) return "POOR";
        return "CRITICAL";
    },

    getNoiseState(noise) {
        if (noise <= 20) return "EXCELLENT";
        if (noise <= 40) return "GOOD";
        if (noise <= 60) return "MODERATE";
        if (noise <= 80) return "POOR";
        return "CRITICAL";
    },

    getAirState(gas) {
        if (gas <= 10) return "EXCELLENT";
        if (gas <= 25) return "GOOD";
        if (gas <= 50) return "MODERATE";
        if (gas <= 75) return "POOR";
        return "CRITICAL";
    },

    getLightMessage(lux) {
        const state = this.getLightState(lux);
        switch (state) {
            case "CRITICAL": return "Iluminação crítica! Prejudica leitura e postura.";
            case "POOR": return "Iluminação baixa ou alta demais. Ajustar luminárias.";
            case "MODERATE": return "Iluminação moderada. Pode gerar cansaço visual.";
            case "GOOD": return "Iluminação adequada.";
            default: return "Iluminação excelente para trabalho.";
        }
    },

    getTempMessage(temp) {
        const state = this.getTempState(temp);
        switch (state) {
            case "CRITICAL": return "Temperatura crítica! Ajustar ar imediatamente.";
            case "POOR": return "Temperatura desconfortável. Ajustar climatização.";
            case "MODERATE": return "Temperatura moderada. Pequeno impacto.";
            case "GOOD": return "Temperatura boa.";
            default: return "Temperatura ideal para produtividade.";
        }
    },

    getHumidityMessage(humidity) {
        const state = this.getHumidityState(humidity);
        switch (state) {
            case "CRITICAL": return "Umidade perigosa. Usar umidificador.";
            case "POOR": return "Umidade fora da zona de conforto.";
            case "MODERATE": return "Umidade moderada.";
            case "GOOD": return "Umidade adequada.";
            default: return "Umidade ideal.";
        }
    },

    getNoiseMessage(noise) {
        const state = this.getNoiseState(noise);
        switch (state) {
            case "CRITICAL": return "Ruído muito alto!";
            case "POOR": return "Ruído ruim.";
            case "MODERATE": return "Ruído moderado.";
            case "GOOD": return "Ruído adequado.";
            default: return "Silêncio ideal.";
        }
    },

    getAirMessage(gas) {
        const state = this.getAirState(gas);
        switch (state) {
            case "CRITICAL": return "Ar muito ruim!";
            case "POOR": return "Qualidade do ar baixa.";
            case "MODERATE": return "Ar moderado.";
            case "GOOD": return "Ar bom.";
            default: return "Ar excelente.";
        }
    },

    getPCIDescription(pci) {
        if (pci >= 90) return "Ambiente excelente para produtividade.";
        if (pci >= 75) return "Ambiente bom, confortável.";
        if (pci >= 60) return "Ambiente moderado, atenção.";
        if (pci >= 40) return "Ambiente ruim, prejudica foco.";
        return "Ambiente crítico — produtividade muito afetada.";
    },

    getPCIState(pci) {
        if (pci >= 90) return "EXCELLENT";
        if (pci >= 75) return "GOOD";
        if (pci >= 60) return "MODERATE";
        if (pci >= 40) return "POOR";
        return "CRITICAL";
    },

    getGeneralRecommendation(pci) {
        if (pci < 40) return "Ambiente crítico! Recomenda-se pausa imediata e ajustes no ambiente.";
        if (pci < 55) return "Ambiente prejudicial. Ajustar luz, temperatura ou ruído.";
        if (pci < 70) return "Ambiente moderado. Pequenos ajustes podem melhorar a produtividade.";
        if (pci < 85) return "Ambiente bom. Apenas monitorar.";
        return "Ambiente excelente. Produtividade ideal.";
    },

    getStateIcon(state) {
        switch (state) {
        case "EXCELLENT":
        case "GOOD":
            return <CircleCheck className="w-6 h-6 text-green-400" />;
        case "MODERATE":
            return <CircleMinus className="w-6 h-6 text-gray-100" />;
        case "POOR":
            return <CircleAlert className="w-6 h-6 text-red-400" />;
        case "CRITICAL":
            return <CircleX className="w-6 h-6 text-red-600" />;
        default:
            return null;
        }
    },

    getStateColors(state) {
        switch (state) {
        case "EXCELLENT":
            return "bg-green-600/20 border-green-500";
        case "GOOD":
            return "bg-green-500/20 border-green-400";
        case "MODERATE":
            return "bg-gray-500/20 border-gray-400";
        case "POOR":
            return "bg-red-500/20 border-red-400";
        case "CRITICAL":
            return "bg-red-600/20 border-red-500";
        default:
            return "bg-gray-900 border-gray-800";
        }
    },
}

export default EnvironmentStates;