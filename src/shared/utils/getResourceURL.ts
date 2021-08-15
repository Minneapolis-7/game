import { API_BASE } from 'shared/const/const';

export default function getResourceURL(path: string): string {
  return path ? `${API_BASE}/resources${path}` : '';
}
