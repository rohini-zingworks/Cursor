import { supabase } from '@/lib/supabase';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  status: 'active' | 'inactive';
  usage: number;
  created_at: string;
  last_used: string;
}

export const apiKeyService = {
  async getApiKeys(): Promise<ApiKey[]> {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }

    return data || [];
  },

  async createApiKey(name: string): Promise<ApiKey> {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid API key name');
    }

    const uniqueKey = `key_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          name: name.trim(),
          key: uniqueKey,
          type: 'dev',
          status: 'active',
          usage: 0
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create API key');
    }

    return data;
  },

  async updateApiKey(id: string, name: string): Promise<ApiKey> {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid API key name');
    }

    const { data, error } = await supabase
      .from('api_keys')
      .update({ name: name.trim() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating API key:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Failed to update API key');
    }

    return data;
  },

  async deleteApiKey(id: string): Promise<void> {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }
  },

  async toggleApiKeyStatus(id: string, status: 'active' | 'inactive'): Promise<ApiKey> {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling API key status:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Failed to toggle API key status');
    }

    return data;
  }
};
