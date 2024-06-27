import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/orderSlice';
import {
  fetchOrderUser,
  fetchUserOrder
} from '../../services/slices/orderUserSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.ordersUser.ordersUser);

  return <ProfileOrdersUI orders={orders} />;
};
