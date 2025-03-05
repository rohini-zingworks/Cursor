'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useApiKeys } from '../../hooks/useApiKeys';
import CurrentPlan from '../../components/dashboard/CurrentPlan';
import ApiKeysList from '../../components/dashboard/ApiKeysList';
import CreateApiKeyModal from '../../components/CreateApiKeyModal';
import EditApiKeyModal from '../../components/EditApiKeyModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

export default function DashboardPage() {
  const {
    apiKeys,
    isLoading,
    error,
    visibleKeyId,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyVisibility,
  } = useApiKeys();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null);
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null);

  const handleCreateKey = async (name: string) => {
    await createApiKey(name);
    setShowCreateModal(false);
  };

  const handleEditKey = async (id: string, newName: string) => {
    await updateApiKey(id, newName);
    setEditingKey(null);
  };

  const handleDeleteKey = async (id: string) => {
    setDeleteKeyId(id);
  };

  const confirmDelete = async () => {
    if (!deleteKeyId) return;
    await deleteApiKey(deleteKeyId);
    setDeleteKeyId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
          loading: {
            style: {
              background: '#3B82F6',
              color: 'white',
            },
          },
        }}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <CurrentPlan usage={{ used: 0, total: 1000 }} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">API Keys</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create API Key
        </button>
      </div>

      <ApiKeysList
        apiKeys={apiKeys}
        visibleKeyId={visibleKeyId}
        onToggleVisibility={toggleKeyVisibility}
        onEdit={setEditingKey}
        onDelete={handleDeleteKey}
      />

      {/* Modals */}
      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={editingKey !== null}
        onClose={() => setEditingKey(null)}
        onSave={(id, newName) => handleEditKey(id, newName)}
        apiKey={editingKey}
      />

      <DeleteConfirmationModal
        isOpen={deleteKeyId !== null}
        onClose={() => setDeleteKeyId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
} 