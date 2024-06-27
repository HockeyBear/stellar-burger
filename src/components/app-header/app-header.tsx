import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userSelector = useSelector(getUser);
  const userName = userSelector?.name || '';

  return <AppHeaderUI userName={userName} />;
};
