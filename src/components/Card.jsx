export default function Card({
    icon: Icon,
    title,
    text = null,
    colorClass = "text-blue-400",
    size = "default",
}) {
    const padding = size === "large" ? "p-8" : "p-6";
    const iconSize = size === "large" ? "w-10 h-10" : "w-8 h-8";
    const titleSize = size === "large" ? "text-xl" : "text-lg";

    const minWidth = size === "default"
        ? "min-w-85 md:min-w-50"
        : "";

    return (
        <div
            className={`bg-gray-900 rounded-2xl border border-gray-800 
            ${padding} ${minWidth} 
            hover:border-gray-700 transition-all shadow-lg hover:shadow-xl`}
        >
            <Icon className={`${colorClass} ${iconSize} mb-4`} />

            <h3 className={`${titleSize} font-semibold text-white mb-3`}>
                {title}
            </h3>

            {text && <p className="text-gray-400">{text}</p>}
        </div>
    );
}
