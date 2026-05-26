const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export async function fetchJSON<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${endpoint}`)
  return res.json() as Promise<T>
}
