export type ToastItem = {
  id: string;
  description: string;
  type: 'success' | 'warning';
  timeout?: number;
};

export type Position = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
