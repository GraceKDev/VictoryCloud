import AboutCard from "./AboutCard";
import News from "./News";

export default function About() {
    return (
        <section style={{ backgroundColor: 'var(--cms-about-bg)' }} className="min-h-[50vh] flex-1">
            <div className="w-full max-w-7xl mx-auto py-16 px-8">
                <h2 style={{ color: 'var(--cms-about-heading)' }}>About Victory Cloud</h2>
                <hr className="my-2 border-gray-400 border-t" />
                <p style={{ color: 'var(--cms-about-body)' }} className="mt-4">
                    Victory Cloud is a creative portfolio showcasing the diverse talents of Nic, an artist, writer, and comic creator. This platform serves as a hub for Nic's artistic journey, featuring a wide range of works that span various mediums and styles. From captivating illustrations to engaging comics and thought-provoking writing, Victory Cloud offers a glimpse into Nic's creative world. Whether you're an art enthusiast, a fan of storytelling, or simply curious about the creative process, Victory Cloud invites you to explore and experience the unique blend of artistry and narrative that defines Nic's work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <AboutCard />
                    <AboutCard />
                    <AboutCard />
                </div>
            </div>
        </section>
    )
}