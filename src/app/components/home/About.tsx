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
    const text = "Welcome! This website is the collection of Victory Cloud works. Onward is a mixture of comics, writing, art, and animation; which is just art with extra pain. All future works are uploaded when they’re eventually finished, which realistically could be whenever, so make sure you follow Victory Cloud’s socials for updates or check in regularly.";
    return (
        <section style={{ backgroundColor: 'var(--cms-about-bg, #b5cbb7)' }} className="min-h-[95vh] flex flex-col justify-center">
            <div className="w-full max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8">
                <h2 style={{ color: 'var(--cms-about-heading)' }} className="mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight">About Victory Cloud</h2>
                <hr className="mb-6 border-onyx border-t" />
                <p style={{ color: 'var(--cms-about-body)' }} className="mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed ">
                    {text}
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
