import { useState } from 'react';
import { ApiKey } from '../../types/api-keys';
import { EyeIcon, EyeSlashIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface ApiKeysListProps {
  apiKeys: ApiKey[];
  visibleKeyId: string | null;
  onToggleVisibility: (keyId: string) => void;
  onEdit: (key: { id: string; name: string }) => void;
  onDelete: (id: string) => void;
}

export default function ApiKeysList({
  apiKeys,
  visibleKeyId,
  onToggleVisibility,
  onEdit,
  onDelete
}: ApiKeysListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyToClipboard = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedId(id);
      toast.success('API key copied to clipboard!', {
        icon: '📋',
        duration: 2000
      });
      
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy API key');
    }
  };

  const formatApiKey = (key: string, isVisible: boolean) => {
    if (isVisible) return key;
    const firstPart = key.slice(0, 8);
    const lastPart = key.slice(-4);
    return `${firstPart}${'*'.repeat(24)}${lastPart}`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">API Keys</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="p-6 flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-6">
              <h3 className="text-sm font-medium text-gray-900">{apiKey.name}</h3>
              <div className="mt-1 flex items-center">
                <code className="text-sm text-gray-500 font-mono">
                  {formatApiKey(apiKey.key, visibleKeyId === apiKey.id)}
                </code>
                <button
                  onClick={() => handleCopyToClipboard(apiKey.key, apiKey.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  {copiedId === apiKey.id ? (
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onToggleVisibility(apiKey.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                {visibleKeyId === apiKey.id ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => onEdit({ id: apiKey.id, name: apiKey.name })}
                className="text-gray-400 hover:text-gray-600"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(apiKey.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 