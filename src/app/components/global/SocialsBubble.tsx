interface SocialsBubbleProps {
    href: string;
    bgColor: string;
    icon: React.ReactNode;
    label: string;
}

export default function SocialsBubble({ href, bgColor, icon, label }: SocialsBubbleProps) {
    return (
        <div className="flex items-center p-4 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: bgColor }}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center justify-center rounded hover:opacity-90 transition-opacity">
                {icon}
            </a>
        </div>
    );
}
