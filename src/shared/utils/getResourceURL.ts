import { API_BASE } from 'shared/const';

export default function getResourceURL(path: string): string {
  return `${API_BASE}/resources${path}`;
}
