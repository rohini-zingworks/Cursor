export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used?: string;
}

export interface ApiKeyCreateRequest {
  name: string;
}

export interface ApiKeyUpdateRequest {
  name: string;
}

export interface ApiUsage {
  used: number;
  total: number;
} 