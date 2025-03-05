'use client';

interface EditApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newName: string) => void;
  apiKey: { id: string; name: string } | null;
}

export default function EditApiKeyModal({ isOpen, onClose, onSave, apiKey }: EditApiKeyModalProps) {
  if (!isOpen || !apiKey) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newName = new FormData(form).get('keyName') as string;
    onSave(apiKey.id, newName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-4">Edit API Key</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="keyName"
            defaultValue={apiKey.name}
            className="w-full px-3 py-2 border border-blue-500 rounded-md outline-none mb-4 text-[14px]"
            autoFocus
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-[14px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[14px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 