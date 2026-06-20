import { ArtApiDto } from "@/app/lib/types/art";
import { getSafeImageSrc } from "@/app/lib/utils/image";

export default function ArtItem(props: ArtApiDto & { onClick?: () => void }) {
    const {artId,title,description,tags,imageUrl,links,uploadedAt,onClick} = props;
    const safeImageUrl = getSafeImageSrc(imageUrl);
    return (
        <div onClick={onClick} className="bg-white shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col">
            <img
                src={safeImageUrl}
                alt={title}
                className="w-full aspect-square object-cover mb-2"
            />
           
        </div>
    );
}
