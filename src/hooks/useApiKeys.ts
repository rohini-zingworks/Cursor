import { useState, useEffect } from 'react';
import { apiKeyService } from '../services/apiKeys';
import { ApiKey } from '../types/api-keys';
import toast from 'react-hot-toast';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);

  const loadApiKeys = async () => {
    const loadingToast = toast.loading('Loading API keys...');
    try {
      const keys = await apiKeyService.getApiKeys();
      setApiKeys(keys || []);
      toast.dismiss(loadingToast);
    } catch (err) {
      console.error('Error loading API keys:', err);
      setError('Failed to load API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (name: string) => {
    try {
      const promise = apiKeyService.createApiKey(name);
      
      toast.promise(promise, {
        loading: 'Creating API key...',
        success: 'API key created successfully!',
        error: 'Failed to create API key'
      });

      const newKey = await promise;
      setApiKeys(prev => [newKey, ...prev]);
      return newKey;
    } catch (err) {
      console.error('Error creating key:', err);
      throw err;
    }
  };

  const updateApiKey = async (id: string, newName: string) => {
    try {
      setError(null);
      if (!newName.trim()) {
        throw new Error('API key name is required');
      }

      const updatedKey = await apiKeyService.updateApiKey(id, newName);
      if (!updatedKey) {
        throw new Error('Failed to update API key');
      }

      setApiKeys(prevKeys => 
        prevKeys.map(key => key.id === id ? updatedKey : key)
      );
      return updatedKey;
    } catch (err) {
      console.error('Error updating API key:', err);
      setError(err instanceof Error ? err.message : 'Failed to update API key');
      throw err;
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeyId(visibleKeyId === keyId ? null : keyId);
    if (visibleKeyId !== keyId) {
      toast('API key visible - treat it securely!', {
        icon: '👀',
        duration: 3000
      });
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  return {
    apiKeys,
    isLoading,
    error,
    visibleKeyId,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyVisibility,
    loadApiKeys
  };
}; 