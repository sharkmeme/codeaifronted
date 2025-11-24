const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function getApiUrl(path: string): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return `${API_BASE_URL}${path}`;
}

export async function apiRequest<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(path);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }
  
  return response.json();
}
