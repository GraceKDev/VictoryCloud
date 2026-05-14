

interface ArtModelProps {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    links: string[];
    uploadedAt: string;

}

interface ArtModalProps extends ArtModelProps {
    onClose: () => void;
}

export default function ArtModal(props: ArtModalProps) {
    return (
        <div onClick={props.onClose} className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl">
                <div className="flex gap-4 ">
                    <div className="w-3/5">
                        <img
                            src={props.imageUrl}
                            alt={props.title}
                            className="w-full aspect-square object-cover "
                        />
                    </div>
                    <div className="flex min-h-full flex-col w-2/5">
                        <h1 className="text-3xl font-bold ">{props.title}</h1>
                        <hr className="mb-4" />
                        <p className="text-gray-700 mb-4">{props.description}</p>
                        <div className="flex flex-col mt-auto">
                            <div className="flex mt-auto flex-wrap gap-2 mb-4">
                                {props.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {props.links.length > 0 && (
                                <>
                                    <hr />
                                    <div className="mt-auto flex flex-col">
                                        <h2> Links </h2>
                                        {props.links.map((link, index) => (
                                            <a key={index} href={link} className="text-blue-500 hover:underline">
                                                View on {link.includes('artstation') ? 'ArtStation' : 'Behance'}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}