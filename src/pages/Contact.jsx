import NavbarHome from "../components/NavbarHome";
import CollaboratorCard from "../components/CollaboratorCard";
import ContactForm from "../components/ContactForm";

export default function Contact() {
    const collaborators = [
        {
            name: "Davi Munhoz",
            linkedin: "https://www.linkedin.com/in/davimunhoz1005/",
            github: "https://github.com/DaviMunhoz1005",
            email: "davimunhoz1005@gmail.com",
        },
        {
            name: "Ana Clara",
            linkedin: "https://www.linkedin.com/in/ana-clara-rocha-oliveira/",
            github: "https://github.com/Olivanaa",
            email: "oliv.anaclara@gmail.com",
        },
        {
            name: "Matheus Von Koss",
            linkedin: "https://www.linkedin.com/in/matheus-von-koss-wildeisen-7828a0356/",
            github: "https://github.com/matheuswildeisen",
            email: "Wildeisenmatheus@gmail.com",
        },
    ];

    return (
        <main className="bg-gray-950 min-h-screen lg:pt-30">
            <NavbarHome />

            <section className="max-w-7xl mx-auto px-4 pt-16 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Entre em Contato</h1>
                <p className="text-gray-400 text-lg mb-12">
                    Preencha o formulário ou fale diretamente com nossa equipe através dos cards abaixo.
                </p>
            </section>

            <section className="max-w-3xl mx-auto px-4 mb-16">
                <ContactForm />
            </section>

            <section className="max-w-7xl mx-auto px-4 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collaborators.map((member) => (
                        <CollaboratorCard key={member.name} {...member} />
                    ))}
                </div>
            </section>
        </main>
    );
}
