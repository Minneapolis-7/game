import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/store/store';

// Use throughout your app instead of plain `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
