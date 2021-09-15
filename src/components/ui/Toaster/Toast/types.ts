export type ToastItem = {
  id: number;
  description: string;
  type: 'success' | 'warning';
};

export type Position = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
