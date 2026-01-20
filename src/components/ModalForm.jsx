import { Input } from "./Input";
import { Button } from "./Button";

export const ModalForm = ({
    show,
    onClose,
    title,
    value,
    onChange,
    onSubmit,
    submitLabel,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Masukkan nama hobi"
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                    />

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                        >
                            {"Batal"}
                        </Button>

                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
