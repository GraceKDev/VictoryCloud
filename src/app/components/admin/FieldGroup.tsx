type FieldGroupProps = {
    label: string;
    type?: "text" | "textarea" | "color" | "url";
    value: string;
    onChange: (value: string) => void;
};

export default function FieldGroup({ label, type = "text", value, onChange }: FieldGroupProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            {type === "textarea" ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
            ) : type === "color" ? (
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-gray-300 p-0.5"
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 font-mono"
                    />
                </div>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )}
        </div>
    );
}
