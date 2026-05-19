import Image from 'next/image';
import SocialsBubble from '../global/SocialsBubble';
export default function CommissionsSocials() {
    return (
        <section className=" bg-white">
            <div className=" flex flex-col p-4">
                <h1 className="text-3xl font-bold mb-4">Connect with Me</h1>
                <p className="text-gray-700 mb-8">Follow me on social media to stay updated on my latest projects, behind-the-scenes content, and more!</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 justify-items-center">
                    <SocialsBubble
                        href="https://twitter.com/yourhandle"
                        bgColor="#493DAF"
                        label="X / Twitter"
                        icon={<Image src="/svg/socials/xTwitter.svg" alt="X / Twitter Logo" width={64} height={64} />}
                    />
                    <SocialsBubble
                        href="https://twitter.com/yourhandle"
                        bgColor="#1DA1F2"
                        label="Twitter"
                        icon={<Image src="/svg/socials/twitter.svg" alt="Twitter Logo" width={64} height={64} />}
                    />
                    <SocialsBubble
                        href="https://instagram.com/yourhandle"
                        bgColor="#E1306C"
                        label="Instagram"
                        icon={<Image src="/svg/socials/instagram.svg" alt="Instagram Logo" width={64} height={64} />}
                    />
                    <SocialsBubble
                        href="https://linkedin.com/in/yourhandle"
                        bgColor="#0077B5"
                        label="LinkedIn"
                        icon={<Image src="/svg/socials/linkedin.svg" alt="LinkedIn Logo" width={64} height={64} />}
                    />
                </div>
            </div>
        </section>
    )

}