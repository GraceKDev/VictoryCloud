import { ArtApiDto } from "@/app/lib/types/art";

export default function ArtItem(props: ArtApiDto & { onClick?: () => void }) {
    const {artId,title,description,tags,imageUrl,links,uploadedAt,onClick} = props;
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