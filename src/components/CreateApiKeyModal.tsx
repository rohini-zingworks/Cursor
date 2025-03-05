'use client';

import { useState } from 'react';

interface CreateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>; // Simplified to just accept a name
}

export default function CreateApiKeyModal({ isOpen, onClose, onCreate }: CreateApiKeyModalProps) {
  const [keyName, setKeyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyName.trim()) {
      setError('Please enter a valid key name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onCreate(keyName.trim());
      setKeyName('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create API key');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-4">Create a new API key</h2>
        
        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Enter key name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none mb-4"
            disabled={isLoading}
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-[14px]"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[14px] disabled:bg-blue-300"
              disabled={isLoading || !keyName.trim()}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 