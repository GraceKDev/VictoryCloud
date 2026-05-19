import Image from "next/image";

interface SocialsBubbleProps {
    href: string;
    bgColor: string;
    icon: React.ReactNode;
    label: string;
}

export default function SocialsBubble({ href, bgColor, icon, label }: SocialsBubbleProps) {
    return (
        <div className="flex items-center p-4 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: bgColor }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2  rounded hover:opacity-90 transition-opacity  ${bgColor}`}>
                {icon}
            </a>
        </div>
    );
}
