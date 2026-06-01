export default function News() {
    return (
        <section style={{ backgroundColor: 'var(--cms-news-bg)' }} className="w-full min-h-[50vh]">
            <div className="max-w-7xl mx-auto py-16 px-8">
                <h2 style={{ color: 'var(--cms-news-heading)' }} className="mb-4">Latest News</h2>
                <hr className="my-2 border-gray-600 border-t" />
                <p style={{ color: 'var(--cms-news-body)' }} className="mb-4">
                    Stay updated with the latest news and updates from VictoryCloud. Here, we share insights into our creative process, upcoming projects, and any exciting developments in the world of art, comics, and writing. Whether it's a new comic release, an art exhibition, or a behind-the-scenes look at our work, this section is your go-to source for all things VictoryCloud. Check back regularly to see what's new and join us on this creative journey!
                </p>
            </div>
        </section>
    )
}