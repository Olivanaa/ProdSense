import { Github, Linkedin, Mail } from "lucide-react";

export default function CollaboratorCard({ name, linkedin, github, email }) {
    return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-white">{name}</h3>

            <div className="flex gap-4">
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 text-blue-400 hover:text-blue-600 transition-colors" />
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 text-gray-200 hover:text-white transition-colors" />
                </a>
                <a href={`mailto:${email}`}>
                    <Mail className="w-6 h-6 text-red-400 hover:text-red-500 transition-colors" />
                </a>
            </div>
        </div>
    );
}
