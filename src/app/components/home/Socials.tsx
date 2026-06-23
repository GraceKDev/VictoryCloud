import Link from "next/link";

export default function Socials() {
    const text = "If you feel the want or need to provide feedback, praise, criticism, or any other form of response, would like to ask questions or ask about commissions (when open) please let me know at my socials by clicking the button below!";
    return (
        <section style={{ backgroundColor: 'var(--cms-socials-bg, #121619)' }} className="w-full min-h-[80vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto py-20 px-8">
                <h2 style={{ color: 'var(--cms-socials-heading, #f5f5f5)' }} className="mb-4">Connect with Us</h2>
                <hr className="mb-6 border-ashGrey border-t"/>
                <p style={{ color: 'var(--cms-socials-body, #f5f5f5)' }} className="leading-relaxed">
                    {text}
                </p>
                <div className="mt-8">
                    <Link
                        href="/commissions"
                        className="inline-flex items-center rounded-md border px-5 py-3 text-sm font-semibold text-offWhite transition-opacity hover:opacity-90"
                        style={{
                            backgroundColor: "#2d4739",
                            borderColor: "#b5cbb7",
                        }}
                    >
                        Check out socials
                    </Link>
                </div>
            </div>
        </section>
    )
}
