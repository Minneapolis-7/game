import { API_YANDEX } from '@/shared/const/const';

export default function getResourceURL(path: string): string {
  return path ? `${API_YANDEX}/resources${path}` : '';
}
