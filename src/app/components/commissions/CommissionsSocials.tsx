import Image from 'next/image';
import SocialsBubble from '../global/SocialsBubble';
export default function CommissionsSocials() {
    return (
        <section className="rounded-2xl border border-ashGrey bg-pineTeal shadow-2xl">
            <div className="flex flex-col p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-offWhite">Connect with Me</h1>
                <p className="text-sm sm:text-base text-offWhite/80 mb-8 leading-relaxed">
                    Follow me on social media to stay updated on my latest projects, behind-the-scenes content, and more.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 justify-items-center">
                    <SocialsBubble
                        href="https://youtube.com/@victorytoclouds"
                        bgColor="#493DAF"
                        label="YouTube"
                        icon={<Image src="/svg/socials/youtube.svg" alt="YouTube Logo" width={64} height={64} className="commissions-social-icon" />}
                    />
                    <SocialsBubble
                        href="https://bsky.app/profile/lkellow.bsky.social"
                        bgColor="#1DA1F2"
                        label="Bluesky"
                        icon={<Image src="/svg/socials/bluesky.svg" alt="Bluesky Logo" width={64} height={64} className="commissions-social-icon" />}
                    />
                    <SocialsBubble
                        href="https://www.instagram.com/victorycloudy?igsh=MTE4MGticWVhenh0cA=="
                        bgColor="#E1306C"
                        label="Instagram"
                        icon={<Image src="/svg/socials/instagram.svg" alt="Instagram Logo" width={64} height={64} className="commissions-social-icon" />}
                    />
                    <SocialsBubble
                        href="https://namicomi.com/en/org/victory-cloud"
                        bgColor="#0077B5"
                        label="Namicomi"
                        icon={<Image src="/svg/socials/namicomi.svg" alt="Namicomi Logo" width={64} height={64} className="commissions-social-icon" />}
                    />
                </div>
            </div>
        </section>
    )

}
