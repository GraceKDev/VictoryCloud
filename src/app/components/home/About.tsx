import AboutCard from "./AboutCard";

interface CardConfig {
    title: string;
    description: string;
    imageUrl: string;
    imageLink:string;
}

async function getAboutCards(): Promise<CardConfig[]> {
    const fallback: CardConfig[] = [
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "/comics" },
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "/art" },
        { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "/writing" },
    ];
    try {
        const res = await fetch("${process.env.BACKEND_URL_DEV}/Api/Config/GetConfig", {
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
        <section style={{ backgroundColor: 'var(--cms-about-bg, #b5cbb7)' }} className="min-h-[80vh] flex flex-col justify-center">
            <div className="w-full max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8">
                <h2 style={{ color: 'var(--cms-about-heading)' }} className="mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight">About Victory Cloud</h2>
                <hr className="mb-6 border-onyx border-t" />
                <p style={{ color: 'var(--cms-about-body)' }} className="mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
                    Victory Cloud is a creative portfolio showcasing the diverse talents of Nic, an artist, writer, and comic creator. This platform serves as a hub for Nic&apos;s artistic journey, featuring a wide range of works that span various mediums and styles. From captivating illustrations to engaging comics and thought-provoking writing, Victory Cloud offers a glimpse into Nic&apos;s creative world. Whether you&apos;re an art enthusiast, a fan of storytelling, or simply curious about the creative process, Victory Cloud invites you to explore and experience the unique blend of artistry and narrative that defines Nic&apos;s work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {cards.map((card, i) => (
                        <AboutCard key={i} title={card.title} description={card.description} imageUrl={card.imageUrl} imageLink={card.imageLink} />
                    ))}
                </div>
            </div>
        </section>
    );
}
