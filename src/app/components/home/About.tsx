import AboutCard from "./AboutCard";

interface CardConfig {
    title: string;
    description: string;
    imageUrl: string;
}

async function getAboutCards(): Promise<CardConfig[]> {
    const fallback: CardConfig[] = [
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
    ];
    try {
        const res = await fetch("http://localhost:5266/Api/Config/GetConfig", {
            credentials: "include",
            next: { revalidate: 60 },
        });
        if (!res.ok) return fallback;
        const data = await res.json();
        return data?.home?.aboutCards ?? fallback;
    } catch {
        return fallback;
    }
}

export default async function About() {
    const cards = await getAboutCards();
    return (
        <section style={{ backgroundColor: 'var(--cms-about-bg)' }} className="min-h-[80vh] flex flex-col justify-center">
            <div className="w-full max-w-7xl mx-auto py-20 px-8">
                <h2 style={{ color: 'var(--cms-about-heading)' }} className="mb-4">About Victory Cloud</h2>
                <hr className="mb-6 border-gray-400 border-t" />
                <p style={{ color: 'var(--cms-about-body)' }} className="mb-10 leading-relaxed">
                    Victory Cloud is a creative portfolio showcasing the diverse talents of Nic, an artist, writer, and comic creator. This platform serves as a hub for Nic's artistic journey, featuring a wide range of works that span various mediums and styles. From captivating illustrations to engaging comics and thought-provoking writing, Victory Cloud offers a glimpse into Nic's creative world. Whether you're an art enthusiast, a fan of storytelling, or simply curious about the creative process, Victory Cloud invites you to explore and experience the unique blend of artistry and narrative that defines Nic's work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <AboutCard key={i} title={card.title} description={card.description} imageUrl={card.imageUrl} />
                    ))}
                </div>
            </div>
        </section>
    );
}