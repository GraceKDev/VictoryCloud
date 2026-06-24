type FaqCard = {
    title: string;
    description: string;
};

async function getFaqCards(): Promise<FaqCard[]> {
    const fallback: FaqCard[] = [
        { title: "What kind of content will be uploaded?", description: "At the moment I’m focusing on a hopefully long running mecha webcomic and will gradually upload horror short stories." },
        { title: "Do you take feedback on your works?", description: "Yes! If you feel the want or need to provide feedback, praise, criticism, or any other form of response (please be constructive) feel free to message me on any of the socials on the ‘contact me’ page." },
        { title: "When does your website update?", description: "Due to the amount of free time I currently have to work on things things will be updated whenever they’re ready. Please follow my social of your choice in the ‘contact me’ page to get updates on when certain series and general updates are uploaded" },
        { title: "Are you caked up?", description: "That’s a rude thing to ask someone you don’t know. Yes" },
        { title: "Do you take commissions?", description: "Sometimes, make sure to check to the ‘Commissions’ tab or my art socials (found on the ‘contact me’ page. I would primarily be doing single pictures, character designs, sketches, thumbnailing/storyboarding, short comics, and short animations. Rates to come when I sort it out. Even if commissions are closed it may be worth sending me your commission suggestion as I may like it enough to put it at the front of the queue when commissions are open." },
        { title: "Can I get any of your works physically?", description: "Currently, no. Hopefully in future we can provide something physical! 🙂" },
    ];

    try {
        const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Config/GetConfig`, {
            cache: "no-store",
        });
        if (!res.ok) return fallback;
        const data = await res.json();
        return data?.home?.faqCards ?? fallback;
    } catch {
        return fallback;
    }
}

export default async function Faq() {
    const cards = await getFaqCards();

    return (
        <section style={{ backgroundColor: "var(--cms-faq-bg, #b5cbb7)" }} className="min-h-[95vh] flex flex-col justify-center">
            <div className="w-full max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8">
                <h2 style={{ color: "var(--cms-faq-heading, #121619)" }} className="mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight">
                    FAQ
                </h2>
                <hr className="mb-6 border-onyx border-t" />
                <p style={{ color: "var(--cms-faq-body, #121619)" }} className="mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed">
                    A few quick answers to common questions about the site and the work here.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {cards.map((card, i) => (
                        <article
                            key={i}
                            style={{ backgroundColor: "var(--cms-faq-card-bg, #121619)" }}
                            className="border-pineTeal border-2 rounded-lg p-4 sm:p-5 shadow-md"
                        >
                            <h3 className="text-lg sm:text-xl font-semibold text-offWhite leading-tight">{card.title}</h3>
                            <hr className="my-3 border-ashGrey/50" />
                            <p className="text-offWhite text-sm sm:text-base leading-relaxed">
                                {card.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
