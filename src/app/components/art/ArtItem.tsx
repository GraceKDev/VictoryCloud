export interface ArtItemProps {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    links: string[];
    uploadedAt: string;
    onClick?: () => void;
}

export default function ArtItem(props: ArtItemProps) {
    const {id,title,description,tags,imageUrl,links,uploadedAt,onClick} = props;
    return (
        <div onClick={onClick} className="bg-white shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col">
            <img
                src={imageUrl}
                alt={title}
                className="w-full aspect-square object-cover mb-2"
            />
           
        </div>
    );
}