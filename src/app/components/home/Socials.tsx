import Link from "next/link";

export default function Socials() {
    return (
        <section style={{ backgroundColor: 'var(--cms-socials-bg, #b5cbb7)' }} className="w-full min-h-[80vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto py-20 px-8">
                <h2 style={{ color: 'var(--cms-socials-heading)' }} className="mb-4">Connect with Us</h2>
                <hr className="mb-6 border-onyx border-t"/>
                <p style={{ color: 'var(--cms-socials-body)' }} className="leading-relaxed">
                    Follow us on social media to stay updated with the latest news, behind-the-scenes content, and exclusive updates from Victory Cloud. Connect with us on platforms like Instagram, Twitter, and Facebook to join our creative community and be the first to know about new projects, art releases, and exciting developments in the world of art, comics, and writing. We love engaging with our audience and sharing our creative journey, so don&apos;t hesitate to reach out and connect with us!
                </p>
                <div className="mt-8">
                    <Link
                        href="/commissions"
                        className="inline-flex items-center rounded-md border px-5 py-3 text-sm font-semibold text-offWhite transition-opacity hover:opacity-90"
                        style={{
                            backgroundColor: "#2d4739",
                            borderColor: "#121619",
                        }}
                    >
                        Check out socials
                    </Link>
                </div>
            </div>
        </section>
    )
}
